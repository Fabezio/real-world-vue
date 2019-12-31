<template lang="pug">
div
    label(v-if='label') {{label}}
    input(:value='value ' @input="updateValue" v-bind='$attrs')
</template>
<script>
    export default {
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: ''
            },
            value: [String, Number ]
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
