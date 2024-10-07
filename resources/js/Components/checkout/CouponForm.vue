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
        addCoupon () {
            this.v$.form.$touch();
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
            <details class="group">
                <summary
                    class="flex w-full cursor-pointer select-none justify-between text-left text-base font-semibold leading-7 text-slate-900 group-open:text-indigo-600"
                >
                    <span>Tem um cupom de desconto?</span>
                    <i class="bi bi-chevron-down group-open:rotate-180"></i>
                </summary>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input
                        v-model="form.name"
                        :class="{
                            '!border-red !border-1': v$.form.name.$error,
                        }"
                        class="block w-full rounded-md py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
