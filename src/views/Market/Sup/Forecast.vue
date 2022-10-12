<template>
    <div :style="{width: '80vw', textAlign: 'center'}">
        <div>
            <a-space>
                <a-select ref="select" v-model:value="value1" style="width: 120px" @focus="focus"
                    @change="handleChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
                <a-select v-model:value="value3" style="width: 120px" loading>
                    <a-select-option value="lucy">Lucy</a-select-option>
                </a-select>
            </a-space>
        </div>
        <br />
        <div>
            <a-image :style="{width: '30vw'}"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </div>
    </div>
</template>

<script lang="ts">
import { AlignCenterOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const options1 = ref<SelectProps['options']>([
            {
                value: 'jack',
                label: 'Jack',
            },
            {
                value: 'lucy',
                label: 'Lucy',
            },
            {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
            },
            {
                value: 'yiminghe',
                label: 'Yiminghe',
            },
        ]);
        const options2 = ref<SelectProps['options']>([
            {
                value: 'lucy',
                label: 'Lucy',
            },
        ]);
        const options3 = ref<SelectProps['options']>([
            {
                value: 'lucy',
                label: 'Lucy',
            },
        ]);
        const focus = () => {
            console.log('focus');
        };

        const handleChange = (value: string) => {
            console.log(`selected ${value}`);
        };

        return {
            focus,
            handleChange,
            value1: ref('lucy'),
            value2: ref('lucy'),
            value3: ref('lucy'),
            options1,
            options2,
            options3,
        };
    },
});
</script>

<style lang="scss">
.image {
    vertical-align: middle;
}
</style>