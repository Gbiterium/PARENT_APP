<template>
  <b-modal
    :id="id"
    ref="modal"
    :title="title"
    :header="header"
    centered
    :size="size"
    ok-only
    :no-stacking="stacking"
    :scrollable="!notScrollable"
    :hide-footer="noFooter"
    ok-title="Save"
    @ok="$emit('ok', $event)"
    @show="$emit('show', $event)"
    @hide="$emit('hide', $event)"
  >
    <slot></slot>
    <template #modal-footer="{ cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->

      <div class="d-flex w-100 justify-content-between px-4">
        <div>
          <b-button
            size="sm"
            variant="light"
            class="py-2 px-4 text-secondary"
            @click="cancel()"
          >
            Cancel
          </b-button>
        </div>
        <div>
          <button
            class="btn btn-primary py-2 px-4"
            @click="$emit('ok', $event)"
          >
            {{ submitTitle }}
        </button>
        </div>
      </div>
      <!-- Button with custom close trigger value -->
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    buttonColor: {
      type: String,
      default: 'info',
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
    stacking: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    title: {
      type: String,
      default: 'Title',
    },
    header: {
      type: String,
      default: 'Header',
    },
    id: {
      type: String,
      default: 'modal',
    },
    submitTitle: {
      type: String,
      default: 'Save',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    notScrollable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
