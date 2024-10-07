<script>
// import { useOfferStore } from '@/Stores/offer';

// const store = useOfferStore()

// console.log(store)

export default {
    name: "OfferList",
    props: ["offers"],
    methods: {
        checkOffer(e, item) {
            this.$emit('check-offer', {
                type: e.target.checked ? "add-cart" : "remove-cart",
                item: item
            });
        },
    },
};
</script>

<template>
    <div class="mt-8 mb-8">
        <p class="text-[1.3rem] font-semibold mb-1 text-center">
            🎉 Você possui 1 oferta!
        </p>
        <p class="text-center mb-4">
            Oportunidade única de adquirir produtos incríveis com um super
            desconto!
        </p>
        <div>
            <template v-for="(offer, index) in offers" :key="index">
                <ul >
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
                                class="rounded-md border border-1 !border-b-4 bg-white hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-gray-100"
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
                                        @change="checkOffer($event, offer.item)"
                                    />
                                    <span class="mx-2 avatar"
                                        ><img :src="offer.item.img"
                                    /></span>
                                    <span class="text-[0.75rem]">
                                        {{ offer.confirm }}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </li>
                </ul>
            </template>
        </div>
    </div>
</template>
