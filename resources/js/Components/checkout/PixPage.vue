<script>
export default {
    name: "PixPage",
    props: ["cart"],
};
</script>

<template>
    <div class="grid grid-cols-2 gap-x-6 p-12 text-base">
        <div class="xl:col-span-1 col-span-2 p-4">
            <div class="font-semibold text-[66px] mb-6">Quase lá..</div>
            <div>Seu PIX foi gerado</div>
            <div>
                Pague seu Pix dentro de <b>28:43</b> para garentir sua compra.
            </div>
            <div class="text-xs">Expirar em: 2025-10-07 23:59:59</div>
            <div
                class="flex bg-warning font-semibold rounded-md px-4 py-3 mt-2"
            >
                <div class="flex-grow">Aguardando pagamento</div>
                <div class="space-x-3 space-y-2 rtl:space-x-reverse">
                    <div
                        class="spinner !animate-ping !border-transparent bg-white"
                        role="status"
                        aria-label="loading"
                    ></div>
                    <div
                        class="spinner !animate-ping !border-transparent bg-white"
                        role="status"
                        aria-label="loading"
                    ></div>
                    <div
                        class="spinner !animate-ping !border-transparent bg-white"
                        role="status"
                        aria-label="loading"
                    ></div>
                </div>
            </div>
        </div>
        <div class="xl:col-span-1 col-span-2 p-4 text-center">
            <div class="font-semibold">
                Abra seu aplicativo de pagamento onde você utiliza o Pix e
                escolha a opção Ler QR Code
            </div>
            <div>Aponte a câmera do seu celular QR Code PIX</div>
            <div>qrcode</div>
            <div>Valor a pagar</div>
            <div class="font-semibold h3">{{ cart.total }}</div>
            <div>
                Você também pode pagar escolhendo a opção
                <b>Pix Copia e Cola</b> no seu aplicativo de pagamento ou
                Internet Banking (banco online). Neste caso, copie o código
                clicando no botão abaixo:
            </div>
            <div
                class="bg-secundary border font-semibold rounded-md px-4 py-3 mt-2"
            >
                Clique aqui para copiar o código pix
            </div>
        </div>
        <div class="xl:col-span-2 col-span-2">
            <div class="p-[3rem] my-3">
                <div>
                    <div
                        class="flex sm:flex-row flex-col items-center justify-between"
                    >
                        <div
                            class="grid grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-1"
                        >
                            <p class="text-4xl">PEDIDO</p>
                            <p class="text-4xl">#{{ cart.id }}</p>
                            <p class="font-medium">DATA DO PEDIDO</p>
                            <p class="font-medium">{{ cart.requestDate }}</p>
                            <p class="font-medium">TOTAL PEDIDO</p>
                            <p class="font-medium">{{ cart.total }}</p>
                        </div>
                        <div class="flex py-24 rounded-l-2xl">
                            <div class="place-self-center">
                                <!-- <img
                                    class="w-96 rounded-8"
                                    src="assets/images/logo/logo-box.svg"
                                    alt="logo"
                                /> -->
                                <i
                                    class="bi bi-box ms-2 text-[3rem] justify-self-end pr-3"
                                ></i>
                            </div>
                            <div class="col-span-2 border-l text-md">
                                <p class="font-medium">CREABOX COMERCIO LTDA</p>
                                <p class="">Curitiba - Paraná - Brasil</p>
                                <p class="">suporte@creabox.com.br</p>
                                <p class="">(41) 9 9149 6623</p>
                                <p class="">CNPJ: 53.007.816/0001-03</p>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="text-md">
                            <p class="text-xl font-medium">
                                Informações do Cliente
                            </p>
                            <p class="">{{ cart.shipping.name }}</p>
                            <p class="">{{ cart.shipping.email }}</p>
                            <p class="">{{ cart.shipping.phone }}</p>
                        </div>
                        <div class="text-md">
                            <p class="text-xl font-medium">
                                Informação de Entrega
                            </p>
                            <p class="">
                                {{ cart.shipping.delivery }}
                            </p>
                            <p class="">
                                {{ cart.shipping.address.street }},
                                {{ cart.shipping.address.number }}
                                {{
                                    cart.shipping.address.complement
                                        ? ", " +
                                          cart.shipping.address.complement
                                        : ""
                                }}, {{ cart.shipping.address.district }},
                                {{ cart.shipping.address.city }}-{{
                                    cart.shipping.address.state
                                }},
                                {{ cart.shipping.address.zipcode }}
                            </p>
                        </div>
                        <div class="text-md">
                            <p class="text-xl font-medium">
                                Informação de Pagamento
                            </p>
                            <p class="">
                                Pagamento em: {{ cart.payment.method }}
                            </p>
                            <p class="">ID Transferência:</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 py-3">
                        <div
                            class="col-span-8 font-medium text-md border-b py-3"
                        >
                            DESCRIÇÃO
                        </div>
                        <div
                            class="invisible sm:visible font-medium text-md text-right border-b py-3"
                        >
                            VALOR
                        </div>
                        <div
                            class="invisible sm:visible font-medium text-md text-right border-b py-3"
                        >
                            QTD
                        </div>
                        <div
                            class="col-span-2 font-medium text-md text-right border-b py-3"
                        >
                            TOTAL
                        </div>
                        <div class="col-span-12">
                            <div
                                class="grid grid-cols-12 py-3 border-b font-semibold"
                                v-for="(item, index) in cart.items"
                                :key="index"
                            >
                                <p
                                    class="col-start-1 col-end-8 sm:col-span-8 text-lg font-medium"
                                >
                                    {{ item.name }}
                                </p>
                                <p
                                    class="invisible sm:visible self-center text-right"
                                >
                                    {{ item.price }}
                                </p>
                                <p
                                    class="invisible sm:visible self-center text-right"
                                >
                                    {{ item.qtd }}
                                </p>
                                <p
                                    class="col-end-13 col-span-3 sm:col-span-2 self-center text-right"
                                >
                                    {{ item.amount }}
                                </p>
                            </div>
                        </div>
                        <p
                            class="col-span-8 self-center font-medium py-3 border-b"
                        >
                            SUBTOTAL
                        </p>
                        <p class="col-span-4 text-right text-lg border-b py-3">
                            {{ cart.subtotal }}
                        </p>
                        <p
                            class="col-span-8 self-center font-medium py-3 border-b"
                        >
                            ENTREGA
                        </p>
                        <p class="col-span-4 text-right text-lg border-b py-3">
                            {{ cart.delivery_fee }}
                        </p>
                        <p
                            class="col-span-8 self-center font-medium py-3 border-b"
                        >
                            DESCONTO
                        </p>
                        <p class="col-span-4 text-right text-lg border-b py-3">
                            {{ cart.discont }}
                        </p>
                        <p
                            class="col-span-8 self-center text-2xl font-medium py-3"
                        >
                            TOTAL
                        </p>
                        <div
                            class="col-span-4 text-right text-2xl font-medium py-3"
                        >
                            {{ cart.total }}
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="font-medium">
                            Agradecemos o seu pagamento a equipe DPay enviará um
                            email com os datalhes do seu pedido.
                        </p>
                        <div class="flex items-start mt-3">
                            <!-- <img
                                class="flex-0 w-40 mt-8"
                                src="assets/images/logo/logo.svg"
                                alt="logo"
                            /> -->
                            <i
                                class="bi bi-box ms-2 text-[3rem] justify-self-center px-6"
                            ></i>
                            <p class="text-sm">
                                Você está efetuando um pagamento para DPay no
                                valor total de R$ 198,20. o seu pedido já foi
                                processado e em breve você receberá um email com
                                as informações de seu pedido. Pode acontecer do
                                seu serviço de e-mail enviar por engano uma de
                                nossas mensagens na caixa de spam. Por isso
                                pedimos que verifique também a sua caixa de
                                spam.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-8">
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
</template>
