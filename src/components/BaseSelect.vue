<template lang="pug">
div
    label(v-if='label') {{label}}
    select(:value='value ' @change="updateValue" v-bind='$attrs' v-on='$listeners')
        option(v-for='option in options', :key='option' , :value='option', :selected='option === value' ) {{ option }}
</template>
<script>
import {formFieldMixin} from '@/mixins/formFieldMixin.js'
export default {
    mixins: [formFieldMixin],
    props: {
        options: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
