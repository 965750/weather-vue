<template>
    <div class="attribute mb-4 pa-0">
        <div class="attribute__value pt-1 text-center px-1">
            <font-awesome-icon
                :icon="icon"
            />
            <p class="my-0">{{ value }}</p>
        </div>
        <p class="attribute__label text-center px-1">
            {{ label }}
        </p>
    </div>
</template>

<script>
export default {
  name: 'SingleAttribute',
  props: {
    icon: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: [String, Number],
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main';

.attribute {
    background: lighten($midnight, 15%);
    border-radius: 10px;
    height: 60px;
    overflow: hidden;
    width: 23%;
    margin: 1%;

    &__value {
        line-height: 16px;
        font-size: 12px;
        height: 40px;
    }

    &__label {
        height: 20px;
        line-height: 20px;
        font-size: 11px;
        background: lighten($midnight, 5%);
    }
}
</style>
