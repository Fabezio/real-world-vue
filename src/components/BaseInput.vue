<template lang="pug">
div
    label(v-if='label') {{label}}
    input(:value='value' v-on='listeners' @input="updateValue" v-bind='$attrs')
</template>
<script>
import {formFieldMixin} from '@/mixins/formFieldMixin.js'
export default {
    mixins: [formFieldMixin],
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
