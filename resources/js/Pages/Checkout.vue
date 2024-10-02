<script>
import WizardForm from "@/Components/checkout/WizardForm.vue";
import successful from "@/assets/img/successful.png";

export default {
    name: "Checkout",
    components: { WizardForm },
    data() {
        return {
            coupon: "",
            successful: successful,
            cart: {
                items: [
                    {
                        id: "i-1233",
                        img: "https://react.spruko.com/ynex-ts-tailwind/preview/assets/1-DAsA0uct.png",
                        name: "Blue sweatshirt",
                        price: "R$ 329,00",
                        discont: "30%",
                        qtd: "2",
                        amount: "R$ 189,00",
                    },
                ],
                offers: [
                    {
                        title: "[OFERTA ÚNICA] de R$ 49,90 por R$ 9,90",
                        description:
                            "Você merece uma surpresa especial da Creabox! Descubra agora os itens exclusivos que preparamos para você, podendo valer até 5x mais do que você imagina.<br /><br /> Imagine abrir sua caixa e encontrar um mix irresistível de produtos naturais, castanhas, suplementos, sache de pré treino, whey protein, pasta de amendoim e outros produtos incríveis! 🎁<br /><br /> Não perca essa oportunidade única de tornar sua experiência ainda mais especial. Garanta já o seu antes que seja tarde demais! 💥<br /><br /> Aproveite a possibilidade de encontrar, a cada mês, um novo item surpresa na sua caixa!",
                        confirm:
                            "Sim, eu quero, Adicione uma surpresa extra na box",
                        item: {
                            id: "i-1234",
                            img: "https://react.spruko.com/ynex-ts-tailwind/preview/assets/1-DAsA0uct.png",
                            name: "Blue sweatshirt",
                            price: "R$ 49,90",
                            discont: "80%",
                            qtd: "1",
                            amount: "R$ 9,90",
                        },
                    },
                ],
                discont: "10% - R$ 31,80",
                subTotal: "R$ 318,00",
                total: "R$ 1.387,00",
            },
            confirmation: false,
        };
    },
    methods: {
        addCart(e) {
            this.cart.items.push(e);
        },
        removeCart(e) {
            this.cart.items = this.cart.items.filter((i) => i.id != e.id);
        },
        finalizePurchase(e) {
            this.confirmation = true;
        },
    },
};
</script>

<template>
    <div
        class="relative pb-112 px-16 sm:pb-208 sm:px-64 overflow-hidden bg-auto bg-blue aboutus-banner"
    >
        <div class="container flex flex-col justify-center">
            <div class="mt-[24em] pt-5 sm:pt-5 text-center">
                <!-- <img
                    class="object-contain h-48 w-full translate-x-6 scale-125 z-50"
                    src="assets/images/logo/logo-box-white.png"
                /> -->
                <div class="text-5xl text-white -mt-[5em] font-bold">LOGO</div>
            </div>
        </div>
    </div>
    <div class="container -mt-[6.4rem]">
        <div class="grid grid-cols-12 gap-x-6" v-if="!confirmation">
            <div class="xl:col-span-8 col-span-12">
                <div class="box overflow-hidden">
                    <wizard-form
                        :offers="cart.offers"
                        @add-cart="addCart($event)"
                        @remove-cart="removeCart($event)"
                        @finalize-purchase="finalizePurchase($event)"
                    />
                </div>
            </div>
            <div class="xl:col-span-4 col-span-12">
                <div class="box">
                    <div
                        class="p-4 text-[1.2rem] border !border-t-0 !border-s-0 !border-e-0 border-b-1"
                    >
                        Resumo do Pedido
                        <span
                            class="badge bg-primary/10 text-primary !border-b-0 !rounded-full text-[0.85rem] px-2 py-1"
                        >
                            {{ cart.items.length }}
                        </span>
                    </div>
                    <div class="box-body !p-0">
                        <ul class="list-group mb-0 !border-0 !rounded-0">
                            <template
                                v-for="(c, index) in cart.items"
                                :key="index"
                            >
                                <li
                                    class="list-group-item !border-t-0 !border-s-0 !border-e-0"
                                >
                                    <div class="flex items-center flex-wrap">
                                        <div class="me-2">
                                            <span
                                                class="avatar avatar-lg bg-light"
                                            >
                                                <img :src="c.img" alt="" />
                                            </span>
                                        </div>
                                        <div class="flex-grow">
                                            <p class="mb-0 font-semibold">
                                                {{ c.name }}
                                            </p>
                                            <p
                                                class="mb-0 text-[#8c9097] dark:text-white/50 text-[0.75rem]"
                                            >
                                                Quantity : {{ c.qtd }}
                                                <span
                                                    class="badge bg-success/10 text-success ms-4"
                                                    >{{ c.discont }} Off</span
                                                >
                                            </p>
                                        </div>
                                        <div>
                                            <p class="mb-0 text-end">
                                                <button
                                                    aria-label="anchor"
                                                    href="#!"
                                                >
                                                    <i
                                                        class="ri-close-line text-[1rem] text-[#8c9097] dark:text-white/50"
                                                    ></i>
                                                </button>
                                            </p>
                                            <p
                                                class="mb-0 text-[0.875rem] font-semibold"
                                            >
                                                <span
                                                    class="ms-1 text-[#8c9097] dark:text-white/50 text-[0.6875rem]"
                                                >
                                                    <s>{{ c.price }}</s>
                                                </span>
                                                {{ c.amount }}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <div
                            class="p-4 border-b border-dashed dark:border-defaultborder/10"
                        >
                            <div
                                class="flex items-center justify-between flex-wrap"
                                v-if="coupon !== ''"
                            >
                                <div
                                    class="text-[0.75rem] font-semibold bg-primary/10 text-primary p-1 rounded-full"
                                >
                                    {{ coupon.name }}
                                </div>
                                <div class="text-success">COUPON APPLIED</div>
                            </div>
                            <div v-else>
                                <dl class="mt-2 divide-y divide-slate-100">
                                    <details
                                        class="group py-4 marker:content-['']"
                                    >
                                        <summary
                                            class="flex w-full cursor-pointer select-none justify-between text-left text-base font-semibold leading-7 text-slate-900 group-open:text-indigo-600"
                                        >
                                            Tem um cupom de desconto?
                                            <svg
                                                class="ml-4 mt-0.5 h-6 w-6 flex-none stroke-slate-700 group-open:stroke-indigo-500"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                                    class="group-open:hidden"
                                                />
                                                <path
                                                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                                                    class="[&amp;::-webkit-details-marker]:hidden"
                                                />
                                            </svg>
                                        </summary>
                                        <div class="pb-6 pt-6">
                                            <div
                                                class="prose prose-slate max-w-none prose-a:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500"
                                            >
                                                <input
                                                    name="coupon"
                                                    id="coupon"
                                                    class="form-control w-full !rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </details>
                                </dl>
                            </div>
                        </div>
                        <div
                            class="p-4 border-b border-dashed dark:border-defaultborder/10"
                        >
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="text-[#8c9097] dark:text-white/50 opacity-[0.7]"
                                >
                                    Subtotal
                                </div>
                                <div class="font-semibold text-[0.875rem]">
                                    {{ cart.subTotal }}
                                </div>
                            </div>
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="text-[#8c9097] dark:text-white/50 opacity-[0.7]"
                                >
                                    Desconto
                                </div>
                                <div
                                    class="font-semibold text-[0.875rem] text-success"
                                >
                                    {{ cart.discont }}
                                </div>
                            </div>
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="text-[#8c9097] dark:text-white/50 opacity-[0.7]"
                                >
                                    Taxa da entrega
                                </div>
                                <div
                                    class="font-semibold text-[0.875rem] text-danger"
                                >
                                    - R$ 29,00
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div
                                    class="text-[#8c9097] dark:text-white/50 opacity-[0.7]"
                                >
                                    Taxa de Serviço (18%)
                                </div>
                                <div class="font-semibold text-[0.875rem]">
                                    - R$ 45,29
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-[0.9375rem]">Total:</div>
                                <div
                                    class="font-semibold text-[1rem] text-dark"
                                >
                                    {{ cart.total }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-x-6" v-else>
            <div class="xl:col-span-12 col-span-12">
                <div class="box overflow-hidden p-[3rem] my-3 text-center">
                    <div class="mb-[3rem]">
                        <h5 class="text-success font-semibold text-[1.25rem]">
                            Pagamento bem-sucedido....🤝
                        </h5>
                    </div>
                    <div class="mb-[3rem] flex justify-center">
                        <img
                            :src="successful"
                            alt=""
                            class="img-fluid max-w-80"
                        />
                    </div>
                    <div class="mb-6">
                        <p class="mb-1 text-[0.875rem]">
                            Você pode rastrear seu pedido com o ID do pedido
                            <b>SPK#1FR</b> from
                            <button class="link-success" href="#">
                                <u class="text-success">Rastrear pedido</u>
                            </button>
                        </p>
                        <p class="text-[#8c9097] dark:text-white/50">
                            Obrigado por comprar conosco.
                        </p>
                    </div>
                    <div>
                        <button
                            :href="route('dashboard')"
                            class="rounded-md text-sm font-semibold py-3 px-4 bg-primary text-white hover:bg-primary-700 uppercase"
                        >
                            Continue comprando!
                            <i class="bi bi-cart ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
