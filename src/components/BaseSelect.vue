<template lang="pug">
div
    label(v-if='label') {{label}}
    select(:value='value ' @change="updateValue" v-bind='$attrs' v-on='$listeners')
        option(v-for='option in options', :key='option' , :value='option', :selected='option === value' ) {{ option }}
</template>
<script>
    export default {
        inheritAttrs: false,
        props: {
            options: {
                type: Array,
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            value: [Array , String]
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
