<template>
    <div class="badge" v-bind:class="classProp">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "pl-badge",
    props: {
        classProp: {
            type: String,
            default: "default"
        }
    }
};
</script>

<style scoped lang="scss">
.badge {
    padding: 5px;
    color: #eeeeee;
    text-align: center;
    font-weight: bold;
    &.success {
        background-color: $greenSuccess;
    }
    &.warning {
        background-color: $yellow;
    }
    &.danger {
        background-color: $redDanger;
    }
    &.default {
        background-color: #949494;
    }
}
</style>
