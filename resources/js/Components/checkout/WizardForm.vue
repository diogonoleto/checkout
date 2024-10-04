<script>
import { mask } from "vue-the-mask";
import NavLink from "@/Components/NavLink.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { phone, cnpjCpf } from "@/Validators/Validators.ts";

const shippingTest = {
    name: "Diogo Noleto",
    email: "diogo@gmail.com",
    birthday: "04/08/1984",
    document: "740.368.072-34",
    phone: "(92) 98158-4393",
    address: {
        zipcode: "",
        number: "",
    },
};

export default {
    name: "WizardForm",
    directives: { mask },
    components: {
        NavLink,
    },
    props: ["offers"],
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            shipping: {
                name: null,
                email: null,
                birthday: null,
                document: null,
                phone: null,
                address: {
                    zipcode: null,
                    street: null,
                    number: null,
                    complement: null,
                    district: null,
                    city: null,
                    state: null,
                },
            },
            payment: {
                method: null,
                card_number: null,
                card_name: null,
                card_expiry_date: null,
                cvv: null,
                document: null,
                installment: null,
            },
            delivery: {
                method: null,
            },
            paymentMethods: [
                {
                    id: "creditcard",
                    name: "CARTÃO DE CRÉDITO",
                    icon: "bi bi-credit-card",
                },
                {
                    id: "pix",
                    name: "PIX",
                    icon: "bi bi-qr-code",
                },
                {
                    id: "boleto",
                    name: "BOLETO",
                    icon: "bi bi-upc",
                },
            ],
            deliveryMethods: [
                {
                    id: "defautl",
                    name: "Defautl",
                    icon: "bi bi-upc",
                },
                {
                    id: "entrega_gratis",
                    name: "Entrega Gratis",
                    icon: "bi bi-upc",
                },
            ],
            steps: [
                {
                    name: "shipping",
                    title: "Informações",
                    display: true,
                    icon: "bi bi-journal-text",
                    active: false,
                },
                {
                    name: "delivery",
                    title: "Entrega",
                    display: true,
                    icon: "bi bi-truck",
                    active: false,
                },
                {
                    name: "payment",
                    title: "Pagamento",
                    display: true,
                    icon: "bi bi-credit-card",
                    active: false,
                },
            ],
            currentStep: 0,
        };
    },
    validations: {
        shipping: {
            name: { required },
            email: { required, email },
            birthday: { required },
            document: { required, cnpjCpf },
            phone: { required, phone },
            address: {
                zipcode: { required },
                street: { required },
                number: { required },
                district: { required },
                city: { required },
                state: { required },
            },
        },
        payment: {
            method: { required },
            card_number: { required },
            card_name: { required },
            card_expiry_date: { required },
            cvv: { required },
            document: { required, cnpjCpf },
            installment: { required },
        },
        delivery: {
            method: { required },
        },
    },
    created() {
        Object.keys(this.shipping).forEach((k) => {
            this.shipping[k] = shippingTest[k];
        });
        this.mStep();
    },
    methods: {
        backShopping() {
            this.v$.shipping.$reset();
            this.currentStep = 0;
            this.mStep();
        },
        submitShopping() {
            this.v$.shipping.$touch();
            if (this.v$.shipping.$error) {
                return false;
            }
            this.currentStep = 1;
            this.mStep();
        },
        submitDelivery() {
            this.v$.delivery.$touch();
            if (this.v$.delivery.$error) {
                return false;
            }
            this.currentStep = 2;
            this.mStep();
        },
        submitPayment() {
            this.v$.shipping.$touch();
            this.v$.delivery.$touch();
            this.v$.payment.method.$touch();

            if (
                this.v$.shipping.$error ||
                this.v$.delivery.$error ||
                this.v$.payment.method.$error
            ) {
                return false;
            }

            if (this.payment.method == "creditcard") {
                this.v$.payment.$touch();
                if (this.v$.payment.$error) {
                    return false;
                }
            }

            const payload = [];
            payload.push({ shipping: this.shipping });
            payload.push({ delivery: this.delivery });
            payload.push({ payment: this.payment });

            this.$emit("finalize-purchase", payload);

            this.currentStep = 1;
            this.mStep();
        },
        mStep() {
            var current = false;
            Object.values(this.steps).forEach((s, i) => {
                if (i == this.currentStep) {
                    s.active = true;
                    current = true;
                } else {
                    s.active = false;
                }
                if (!current) {
                    s.icon = "bi bi-check2-all";
                }
            });
        },
        checkOffer(e, item) {
            const a = e.target.checked ? "add-cart" : "remove-cart";
            this.$emit(a, item);
        },
        getCep() {
            const cep = this.shipping.address.zipcode.replace(/\D/g, "");
            if (cep.length !== 8) {
                return;
            } else {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Erro ao buscar o endereço");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        this.shipping.address.street = data.logradouro;
                        this.shipping.address.district = data.bairro;
                        this.shipping.address.city = data.localidade;
                        this.shipping.address.state = data.uf;
                        this.$refs.number.select();
                    })
                    .catch((error) => {
                        console.error("Erro:", error);
                    });
            }
        },
    },
};
</script>

<template>
    <div>
        <nav
            class="btn-group p-4 border !border-t-0 !border-s-0 !border-e-0 border-b-1"
        >
            <div class="grid grid-cols-3 gap-3 steps">
                <template v-for="(step, index) in steps" :key="index">
                    <div class="xl:col-span-1 col-span-3 text-center">
                        <a
                            class="text-[1.2rem] relative bg-white"
                            :class="step.active ? 'text-blue font-bold' : ''"
                            v-if="step.display"
                        >
                            <i :class="step.icon" class="me-2"></i>
                            {{ step.title }}
                        </a>
                    </div>
                </template>
            </div>
        </nav>
        <div>
            <div v-if="steps[currentStep].name == 'shipping'">
                <div class="p-8">
                    <div class="grid grid-cols-12 gap-3">
                        <div class="xl:col-span-6 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.name"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red': v$.shipping.name.$error,
                                    }"
                                    id="name"
                                    @blur="v$.shipping.name.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.name.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="name"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Nome completo*
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-6 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.email"
                                    type="email"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red': v$.shipping.email.$error,
                                    }"
                                    id="email"
                                    @blur="v$.shipping.email.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.email.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="email"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    E-mail*
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-4 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.birthday"
                                    class="form-control w-full !rounded-md"
                                    v-mask="'##/##/####'"
                                    :class="{
                                        'border-red':
                                            v$.shipping.birthday.$error,
                                    }"
                                    id="birthday"
                                    @blur="v$.shipping.birthday.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.birthday.$touch()
                                    "
                                    @focus="$event.target.select()"
                                    unmasked-value
                                />
                                <label
                                    htmlFor="birthday"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Data de nascimento*
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-4 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.document"
                                    class="form-control w-full !rounded-md"
                                    v-mask="[
                                        '###.###.###-##',
                                        '##.###.###/####-##',
                                    ]"
                                    :class="{
                                        'border-red':
                                            v$.shipping.document.$error,
                                    }"
                                    id="document"
                                    @blur="v$.shipping.document.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.document.$touch()
                                    "
                                    @focus="$event.target.select()"
                                    unmasked-value
                                />
                                <label
                                    htmlFor="document"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    CPF/CNPJ*
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-4 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.phone"
                                    v-mask="'(##) #####-####'"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red': v$.shipping.phone.$error,
                                    }"
                                    id="phone"
                                    @blur="v$.shipping.phone.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.phone.$touch()
                                    "
                                    @focus="$event.target.select()"
                                    unmasked-value
                                />
                                <label
                                    htmlFor="phone"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Telefone
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.zipcode"
                                    v-mask="'##.###-###'"
                                    :class="{
                                        'border-red':
                                            v$.shipping.address.zipcode.$error,
                                    }"
                                    class="form-control w-full !rounded-md"
                                    id="zipcode"
                                    @blur="v$.shipping.address.zipcode.$touch()"
                                    @keyup="getCep()"
                                    @focus="$event.target.select()"
                                    unmasked-value
                                />
                                <label
                                    htmlFor="zipcode"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    CEP
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-7 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.street"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.shipping.address.street.$error,
                                    }"
                                    id="street"
                                    @blur="v$.shipping.address.street.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.address.street.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="street"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Endereço
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-2 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.number"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.shipping.address.number.$error,
                                    }"
                                    id="number"
                                    ref="number"
                                    @blur="v$.shipping.address.number.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.address.number.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="number"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Número
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.complement"
                                    class="form-control w-full !rounded-md"
                                    id="complement"
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="complement"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Complemento
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.district"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.shipping.address.district.$error,
                                    }"
                                    id="district"
                                    @blur="
                                        v$.shipping.address.district.$touch()
                                    "
                                    @keydown.enter.prevent="
                                        v$.shipping.address.district.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="district"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Bairro
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.city"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.shipping.address.city.$error,
                                    }"
                                    id="city"
                                    @blur="v$.shipping.address.city.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.address.city.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="city"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Cidade
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <input
                                    v-model="shipping.address.state"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.shipping.address.state.$error,
                                    }"
                                    id="state"
                                    @blur="v$.shipping.address.state.$touch()"
                                    @keydown.enter.prevent="
                                        v$.shipping.address.state.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                                <label
                                    htmlFor="state"
                                    class="!text-[0.75rem] after:bg-white after:dark:bg-bodybg after:rounded-md after:inset-y-4 after:inset-x-[0.375rem]"
                                >
                                    Estado
                                </label>
                            </div>
                        </div>
                        <div class="xl:col-span-12 col-span-12 ms-3">
                            Porque precisamos do seu endereço?
                            <br />
                            É para garantir que sua box chegue no endereço
                            correto.
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                        <div
                            class="xl:col-span-1 col-span-3 xl:col-start-3 text-end"
                        >
                            <button
                                class="rounded-md text-sm font-semibold py-3 px-4 bg-primary text-white hover:bg-primary-700 uppercase"
                                @click="submitShopping()"
                            >
                                <span>PRÓXIMO</span>
                                <i class="bi bi-chevron-right ms-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="steps[currentStep].name == 'delivery'">
                <div class="p-8">
                    <div class="grid grid-cols-12 gap-3 mb-6">
                        <div class="xl:col-span-12 col-span-12">
                            <div>Endereço de Entrega</div>
                            <div class="rounded-md border border-1 mt-2">
                                <div class="p-6">
                                    <i
                                        class="bi bi-house-fill text-lg mr-3"
                                    ></i>
                                    {{ shipping.address.street }},
                                    {{ shipping.address.number }}
                                    {{
                                        shipping.address.complement
                                            ? ", " + shipping.address.complement
                                            : ""
                                    }}, {{ shipping.address.district }},
                                    {{ shipping.address.city }}-{{
                                        shipping.address.state
                                    }},
                                    {{ shipping.address.zipcode }}
                                </div>
                            </div>
                        </div>
                        <div class="xl:col-span-12 col-span-12 mt-3">
                            <div>Método de Entrega</div>
                            <template
                                v-for="method in deliveryMethods"
                                :key="method.id"
                            >
                                <label
                                    class="rounded-md border border-1 mt-2 p-6 block"
                                    :htmlFor="'delivery-method-' + method.id"
                                    :class="{
                                        'border-red': v$.delivery.method.$error,
                                    }"
                                >
                                    <input
                                        v-model="delivery.method"
                                        :value="method.id"
                                        class="mr-2 form-radio"
                                        type="radio"
                                        :id="'delivery-method-' + method.id"
                                    />
                                    {{ method.name }}
                                </label>
                            </template>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                        <div class="xl:col-span-1 col-span-3">
                            <button
                                class="rounded-md text-sm font-semibold py-3 px-4 border border-black hover:bg-primary-700 uppercase text-left"
                                @click="backShopping()"
                            >
                                <i class="bi bi-chevron-left me-4"></i>
                                <span>VOLTAR</span>
                            </button>
                        </div>
                        <div
                            class="xl:col-span-1 col-span-3 xl:col-start-3 text-end"
                        >
                            <button
                                class="rounded-md text-sm font-semibold py-3 px-4 bg-primary text-white hover:bg-primary-700 uppercase"
                                @click="submitDelivery()"
                            >
                                <span>PRÓXIMO</span>
                                <i class="bi bi-chevron-right ms-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="steps[currentStep].name == 'payment'">
                <div class="p-8">
                    <div class="grid grid-cols-12 gap-3">
                        <template
                            v-for="method in paymentMethods"
                            :key="method.id"
                        >
                            <div class="xl:col-span-4 col-span-12">
                                <label
                                    class="flex justify-between items-center px-4 py-4 border border-1 rounded-md block"
                                    :class="{
                                        'border-red': v$.payment.method.$error,
                                    }"
                                    :htmlFor="'payment-method-' + method.id"
                                >
                                    <i
                                        class="text-lg mr-2 text-[0.9rem]"
                                        :class="method.icon"
                                    ></i>
                                    <div class="grow">{{ method.name }}</div>
                                    <input
                                        v-model="payment.method"
                                        :value="method.id"
                                        class="form-radio !align-middle"
                                        type="radio"
                                        :id="'payment-method-' + method.id"
                                        @blur="v$.payment.$reset()"
                                    />
                                </label>
                            </div>
                        </template>
                    </div>
                    <div
                        class="grid grid-cols-12 gap-3 mt-8"
                        v-if="payment.method == 'creditcard'"
                    >
                        <div class="xl:col-span-6 col-span-12">
                            <div class="form-floating">
                                <label
                                    htmlFor="payment[card_number]"
                                    class="form-label"
                                >
                                    Número do cartão
                                </label>
                                <input
                                    v-model="payment.card_number"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.payment.card_number.$error,
                                    }"
                                    v-mask="'#### #### #### ####'"
                                    id="payment[card_number]"
                                    @blur="v$.payment.card_number.$touch()"
                                    @keydown.enter.prevent="
                                        v$.payment.card_number.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <label
                                    htmlFor="payment[card_expiry_date]"
                                    class="form-label"
                                >
                                    Validade
                                </label>
                                <input
                                    v-model="payment.card_expiry_date"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.payment.card_expiry_date.$error,
                                    }"
                                    v-mask="'##/##'"
                                    id="card_expiry_date"
                                    @blur="v$.payment.card_expiry_date.$touch()"
                                    @keydown.enter.prevent="
                                        v$.payment.card_expiry_date.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                            </div>
                        </div>
                        <div class="xl:col-span-3 col-span-12">
                            <div class="form-floating">
                                <label
                                    htmlFor="payment[cvv]"
                                    class="form-label"
                                >
                                    CVV
                                </label>
                                <input
                                    v-model="payment.cvv"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red': v$.payment.cvv.$error,
                                    }"
                                    v-mask="'###'"
                                    id="payment[cvv]"
                                    @blur="v$.payment.cvv.$touch()"
                                    @keydown.enter.prevent="
                                        v$.payment.cvv.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                            </div>
                        </div>
                        <div class="xl:col-span-8 col-span-12">
                            <div class="form-floating">
                                <label
                                    htmlFor="payment[card_name]"
                                    class="form-label"
                                >
                                    Titular do cartão
                                </label>
                                <input
                                    v-model="payment.card_name"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.payment.card_name.$error,
                                    }"
                                    id="payment[card_name]"
                                    @blur="v$.payment.card_name.$touch()"
                                    @keydown.enter.prevent="
                                        v$.payment.card_name.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                            </div>
                        </div>
                        <div class="xl:col-span-4 col-span-12">
                            <div class="form-floating">
                                <label
                                    htmlFor="payment[document]"
                                    class="form-label"
                                >
                                    CPF/CNPJ
                                </label>
                                <input
                                    v-model="payment.document"
                                    class="form-control w-full !rounded-md"
                                    :class="{
                                        'border-red':
                                            v$.payment.document.$error,
                                    }"
                                    v-mask="[
                                        '###.###.###-##',
                                        '##.###.###/####-##',
                                    ]"
                                    id="payment[document]"
                                    @blur="v$.payment.document.$touch()"
                                    @keydown.enter.prevent="
                                        v$.payment.document.$touch()
                                    "
                                    @focus="$event.target.select()"
                                />
                            </div>
                        </div>
                        <div class="xl:col-span-12 col-span-12">
                            <div class="form-floating">
                                <label
                                    htmlFor="payment[document]"
                                    class="form-label"
                                >
                                    Parcelas*
                                </label>
                                <select
                                    class="form-control w-full !rounded-md"
                                    v-model="payment.installment"
                                    :class="{
                                        'border-red':
                                            v$.payment.installment.$error,
                                    }"
                                    @blur="v$.payment.installment.$touch()"
                                >
                                    <option>1x de R$ 180,07 s/juros</option>
                                    <option>2x de R$ 120,07 s/juros</option>
                                    <option>3x de R$ 66,07 s/juros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 mb-8">
                        <p class="text-[1.3rem] font-semibold mb-1 text-center">
                            🎉 Você possui 1 oferta!
                        </p>
                        <p class="text-center mb-4">
                            Oportunidade única de adquirir produtos incríveis
                            com um super desconto!
                        </p>
                        <div>
                            <template
                                v-for="(offer, index) in offers"
                                :key="index"
                            >
                                <ul>
                                    <li
                                        class="py-4 pl-4 pr-5 text-[1.3rem] bg-[#e73f5d] text-white font-semibold"
                                    >
                                        {{ offer.title }}
                                    </li>
                                    <li
                                        class="py-4 pl-4 pr-5 bg-[#fffbe4] border border-red border-2 !border-t-0 !border-b-2 border-dashed rounded-b-md"
                                    >
                                        <div class="w-100">
                                            <p v-html="offer.description"></p>
                                        </div>
                                        <div class="w-100 py-2">
                                            <div
                                                class="rounded-md border border-1 !border-b-4 bg-white hover:border-blue"
                                            >
                                                <label
                                                    class="flex items-center block py-4 pl-4 pr-5"
                                                    :htmlFor="'offer-' + index"
                                                >
                                                    <input
                                                        :value="offer.item.img"
                                                        class="form-checkbox"
                                                        type="checkbox"
                                                        :id="'offer-' + index"
                                                        @change="
                                                            checkOffer(
                                                                $event,
                                                                offer.item
                                                            )
                                                        "
                                                    />
                                                    <label class="mx-2 avatar"
                                                        ><img
                                                            :src="
                                                                offer.item.img
                                                            "
                                                    /></label>
                                                    <label
                                                        class="text-[0.75rem]"
                                                    >
                                                        {{ offer.confirm }}
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                        <div class="xl:col-span-1 col-span-3">
                            <button
                                class="rounded-md text-sm font-semibold py-3 px-4 border border-black hover:bg-primary-700 uppercase text-left"
                                @click="submitShopping()"
                            >
                                <i class="bi bi-chevron-left me-4"></i>
                                <span>VOLTAR</span>
                            </button>
                        </div>
                        <div
                            class="xl:col-span-1 col-span-3 xl:col-start-3 text-end"
                        >
                            <button
                                class="rounded-md text-sm font-semibold py-3 px-4 bg-primary text-white hover:bg-primary-700 uppercase text-end"
                                @click="submitPayment()"
                            >
                                <span>Adquirir Agora</span>
                                <i class="bi bi-chevron-right ms-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
