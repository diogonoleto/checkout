<script>
import CouponForm from "@/Components/checkout/CouponForm.vue";
import WizardForm from "@/Components/checkout/WizardForm.vue";
import successful from "@/assets/img/successful.png";
import PixPage from "@/Components/checkout/PixPage.vue";

export default {
    name: "Checkout",
    components: { WizardForm, CouponForm, PixPage },
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
                id: '454432635',
                discont: "10% - R$ 31,80",
                delivery_fee: "+ R$ 29,00",
                service_fee: "18% + R$ 45,29",
                subTotal: "R$ 318,00",
                total: "R$ 1.387,00",
                requestDate: "08/10/2024"
            },
            confirmation: null,
        };
    },
    methods: {
        addCart(e) {
            this.cart.items.push(e);
        },
        removeCart(e) {
            this.cart.items = this.cart.items.filter((i) => i.id != e.id);
        },
        addCoupon() {
            console.log(this.coupon);
        },
        finalizePurchase(e) {
            this.confirmation = e.payment.method;
            this.cart.payment = e.payment;
            this.cart.shipping = e.shipping;
            this.cart.delivery = e.delivery;
        },
    },
};
</script>

<template>
    <div class="relative px-16 sm:pb-208 sm:px-64 overflow-hidden bg-indigo">
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
                        class="p-4 text-[1.2rem] rounded-t-md bg-primary text-white"
                    >
                        Resumo do Pedido
                        <span
                            class="badge bg-gray-100 text-primary !border-b-0 !rounded-full text-[0.85rem] px-2 py-1"
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
                                                    <s class="text-red">{{ c.price }}</s>
                                                </span>
                                                {{ c.amount }}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <div
                            class="px-4 py-6 border-b border-dashed dark:border-defaultborder/10"
                        >
                            <coupon-form />
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
                                    {{ cart.delivery_fee }}
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div
                                    class="text-[#8c9097] dark:text-white/50 opacity-[0.7]"
                                >
                                    Taxa de Serviço
                                </div>
                                <div
                                    class="font-semibold text-[0.875rem] text-danger"
                                >
                                    {{ cart.service_fee }}
                                </div>
                            </div>
                        </div>
                        <div class="p-4 bg-primary text-white border-b">
                            <div class="flex items-center justify-between">
                                <div class="text-[1.2rem]">Total:</div>
                                <div
                                    class="font-semibold text-[1.6rem] text-dark"
                                >
                                    {{ cart.total }}
                                </div>
                            </div>
                        </div>
                        <div class="p-4 bg-primary/100 rounded-b-md text-white">
                            <div class="font-semibold text-sm text-dark text-center">
                                <i class="bi bi-shield-fill-check"></i>
                                COMPRA 100% SEGURA
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box overflow-hidden" v-else-if="confirmation == 'pix'">
            <pix-page :cart="cart" />
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
                            :href="route('checkout')"
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
