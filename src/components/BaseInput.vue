<template lang="pug">
div
    label(v-if='label') {{label}}
    input(:value='value' v-on='listeners' @input="updateValue" v-bind='$attrs')
</template>
<script>
    export default {
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: ''
            },
            value: [String, Number, Array ]
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: this.updateValue
                }
            }

        }
    }
</script>

<style scoped>

</style>
