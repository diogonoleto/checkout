<script>
// import { useOfferStore } from '@/Stores/offer';

// const store = useOfferStore()

// console.log(store)

export default {
    name: "PixPage",
    methods: {
        // checkOffer(e, item) {
        //     this.$emit('check-offer', {
        //         type: e.target.checked ? "add-cart" : "remove-cart",
        //         item: item
        //     });
        // },
    },
};
</script>

<template>
    <div class="grid grid-cols-2 gap-x-6 p-12 text-base">
        <div class="xl:col-span-1 col-span-2">
            <div class="font-semibold text-[66px] mb-6">Quase lá..</div>
            <div>Seu PIX foi gerado</div>
            <div>
                Pague seu Pix dentro de <b>28:43</b> para garentir sua compra.
            </div>
            <div class="text-xs">Expirar em: 2025-10-07 23:59:59</div>
            <div class="bg-warning font-semibold rounded-md px-4 py-3 mt-2">
                Aguardando pagamento
            </div>
        </div>
        <div class="xl:col-span-1 col-span-2 text-center">
            <div class="font-semibold">
                Abra seu aplicativo de pagamento onde você utiliza o Pix e
                escolha a opção Ler QR Code
            </div>
            <div>Aponte a câmera do seu celular QR Code PIX</div>
            <div>qrcode</div>
            <div>Valor a pagar</div>
            <div class="font-semibold h3">R$ 198,20</div>
            <div>
                Você também pode pagar escolhendo a opção <b>Pix Copia e Cola</b> no
                seu aplicativo de pagamento ou Internet Banking (banco online).
                Neste caso, copie o código clicando no botão abaixo:
            </div>
            <div class="bg-secundary border font-semibold rounded-md px-4 py-3 mt-2">
                Clique aqui para copiar o código pix
            </div>
        </div>
        <div class="xl:col-span-2 col-span-2">
            <div class="p-[3rem] my-3 text-center">
                <div class="mb-[3rem]">
                    PEDIDO #454432635 DATA DO PEDIDO 2024-10-07 TOTAL PEDIDO R$
                    198,20 logo CREABOX COMERCIO LTDA Curitiba - Paraná - Brasil
                    suporte@creabox.com.br (41) 9 9149 6623 CNPJ:
                    53.007.816/0001-03 Informações do Cliente Diogo Noleto
                    diogonoletodasilva@gmail.com +55(92) 9 3213-4123 Informação
                    de Entrega Expresso (Envio por Jadlog) - R$ 18,50 R. Des.
                    Cândido Onório, 96 - Planalto, Manaus - AM, 69044-080,
                    Brasil Informação de Pagamento Pagamento em: PIX ID
                    Transferência: DESCRIÇÃO VALOR QTI TOTAL 3 gramas/dia R$
                    179,70 1 R$ 179,70 SUBTOTAL R$ 179,70 ENTREGA R$ 18,50
                    DESCONTO R$ 0,00 TOTAL R$ 198,20 Agradecemos o seu pagamento
                    a equipe DPay enviará um email com os datalhes do seu
                    pedido. logo Você está efetuando um pagamento para DPay no
                    valor total de R$ 198,20. o seu pedido já foi processado e
                    em breve você receberá um email com as informações de seu
                    pedido. Pode acontecer do seu serviço de e-mail enviar por
                    engano uma de nossas mensagens na caixa de spam. Por isso
                    pedimos que verifique também a sua caixa de spam.
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
</template>
