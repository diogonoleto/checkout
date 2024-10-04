<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
    name: "CouponForm",
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            coupon: {
                name: null,
            },
            form: {
                name: null,
            },
        };
    },
    validations: {
        form: {
            name: { required },
        },
    },
    methods: {
        addCoupon() {
            this.coupon = { ...this.form };
        },
    },
};
</script>

<template>
    <div class="flex items-center justify-between flex-wrap" v-if="coupon.name">
        <div
            class="text-[0.75rem] font-semibold bg-primary/10 text-primary p-2 rounded-full uppercase"
        >
            {{ coupon.name }}
        </div>
        <div class="text-success">CUPOM APLICADO</div>
    </div>
    <div v-else>
        <dl>
            <details>
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
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input
                        v-model="form.name"
                        class="block w-full rounded-md border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div
                        class="absolute inset-y-0 right-0 flex items-center m-2"
                    >
                        <button
                            @click="addCoupon()"
                            class="h-full rounded-md border-0 bg-transparent py-0 px-3 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                            APLICAR
                        </button>
                    </div>
                </div>
            </details>
        </dl>
    </div>
</template>
