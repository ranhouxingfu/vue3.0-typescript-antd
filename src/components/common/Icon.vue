<script lang="ts">
import {computed} from 'vue';
 export default {
    name: 'Icon',
    props: {
        iconClass: {
            type: String,
            required: true
        }
    },
    setup(props: any) {
      const iconName = computed(() =>`#${props.iconClass}`);
      return {
        iconName
      }
    }
};
</script>
<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
