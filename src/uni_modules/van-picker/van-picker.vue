<template>
  <div class="van-picker custom-class">
    <!-- 工具栏在顶部 -->
    <template v-if="toolbarPosition === 'top'">
      <PickerToolbar />
    </template>

    <!-- 加载状态 -->
    <div v-if="loading" class="van-picker__loading">
      <van-loading color="#1989fa" />
    </div>

    <!-- 列表区域 -->
    <div
      class="van-picker__columns"
      :style="columnsStyle"
      @touchmove.prevent
    >
      <van-picker-column
        v-for="(item, index) in columns"
        :key="index"
        :options="item.values"
        :default-index="item.defaultIndex !== undefined ? item.defaultIndex : defaultIndex"
        :item-height="itemHeight"
        :visible-item-count="visibleItemCount"
        :value-key="valueKey"
        :class="'column-class'"
        active-class="active-class"
        @change="onChange(index, $event)"
      />

      <div class="van-picker__mask" :style="maskStyle" />
      <div class="van-picker__frame van-hairline--top-bottom" :style="frameStyle" />
    </div>

    <!-- 工具栏在底部 -->
    <template v-if="toolbarPosition === 'bottom'">
      <PickerToolbar />
    </template>
  </div>
</template>

<script>
 import { VantComponent } from '../common/component'
  import {
    pickerProps,

  } from './shared';

  VantComponent({
    classes: ['active-class', 'toolbar-class', 'column-class'],

    props: {
      ...pickerProps,
      valueKey: {
        type: String,
        value: 'text',
      },
      toolbarPosition: {
        type: String,
        value: 'top',
      },
      defaultIndex: {
        type: Number,
        value: 0,
      },
      columns: {
        type: Array,
        value: [],
        observer(columns = []) {
          this.simple = columns.length && !columns[0].values;

          if (Array.isArray(this.children) && this.children.length) {
            this.setColumns().catch(() => {});
          }
        },
      },
    },

    beforeCreate() {
      Object.defineProperty(this, 'children', {
        get: () => this.selectAllComponents('.van-picker__column') || [],
      });
    },

    methods: {
      noop() {},

      setColumns() {
        const {
          data
        } = this;
        const columns = this.simple ? [{
          values: data.columns
        }] : data.columns;
        const stack = columns.map((column: Column, index: number) =>
          this.setColumnValues(index, column.values)
        );
        return Promise.all(stack);
      },

      emit(event: WechatMiniprogram.TouchEvent) {
        const {
          type
        } = event.currentTarget.dataset;
        if (this.simple) {
          this.$emit(type, {
            value: this.getColumnValue(0),
            index: this.getColumnIndex(0),
          });
        } else {
          this.$emit(type, {
            value: this.getValues(),
            index: this.getIndexes(),
          });
        }
      },

      onChange(event: WechatMiniprogram.CustomEvent) {
        if (this.simple) {
          this.$emit('change', {
            picker: this,
            value: this.getColumnValue(0),
            index: this.getColumnIndex(0),
          });
        } else {
          this.$emit('change', {
            picker: this,
            value: this.getValues(),
            index: event.currentTarget.dataset.index,
          });
        }
      },

      // get column instance by index
      getColumn(index: number) {
        return this.children[index];
      },

      // get column value by index
      getColumnValue(index: number) {
        const column = this.getColumn(index);
        return column && column.getValue();
      },

      // set column value by index
      setColumnValue(index: number, value: any) {
        const column = this.getColumn(index);

        if (column == null) {
          return Promise.reject(new Error('setColumnValue: 对应列不存在'));
        }

        return column.setValue(value);
      },

      // get column option index by column index
      getColumnIndex(columnIndex: number) {
        return (this.getColumn(columnIndex) || {}).data.currentIndex;
      },

      // set column option index by column index
      setColumnIndex(columnIndex: number, optionIndex: number) {
        const column = this.getColumn(columnIndex);

        if (column == null) {
          return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
        }

        return column.setIndex(optionIndex);
      },

      // get options of column by index
      getColumnValues(index: number) {
        return (this.children[index] || {}).data.options;
      },

      // set options of column by index
      setColumnValues(index: number, options: any[], needReset = true) {
        const column = this.children[index];

        if (column == null) {
          return Promise.reject(new Error('setColumnValues: 对应列不存在'));
        }

        const isSame =
          JSON.stringify(column.data.options) === JSON.stringify(options);

        if (isSame) {
          return Promise.resolve();
        }

        return column.set({
          options
        }).then(() => {
          if (needReset) {
            column.setIndex(0);
          }
        });
      },

      // get values of all columns
      getValues() {
        return this.children.map((child) => child.getValue());
      },

      // set values of all columns
      setValues(values: any[]) {
        const stack = values.map((value, index) =>
          this.setColumnValue(index, value)
        );
        return Promise.all(stack);
      },

      // get indexes of all columns
      getIndexes() {
        return this.children.map((child) => child.data.currentIndex);
      },

      // set indexes of all columns
      setIndexes(indexes: number[]) {
        const stack = indexes.map((optionIndex, columnIndex) =>
          this.setColumnIndex(columnIndex, optionIndex)
        );
        return Promise.all(stack);
      },
    },
  });
</script>

<style>
</style>
