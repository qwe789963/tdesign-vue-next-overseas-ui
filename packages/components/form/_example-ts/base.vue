<template>
  <t-form ref="form" :rules="FORM_RULES" :data="formData" @reset="onReset" @submit="onSubmit">
    <t-form-item label="UserName" help="You can display a paragraph of explanatory text here" name="account">
      <t-input v-model="formData.account" placeholder="Please enter"></t-input>
    </t-form-item>

    <t-form-item label="Password" name="password">
      <t-input v-model="formData.password" type="password" placeholder="Please enter"></t-input>
    </t-form-item>

    <t-form-item label="Email" name="email">
      <t-input v-model="formData.email" placeholder="Please enter"></t-input>
    </t-form-item>

    <t-form-item label="Gender" name="gender">
      <t-radio-group v-model="formData.gender">
        <t-radio value="male">male</t-radio>
        <t-radio value="female">female</t-radio>
      </t-radio-group>
    </t-form-item>

    <t-form-item label="Course" name="course">
      <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
    </t-form-item>

    <t-form-item label="College" name="college">
      <t-select v-model="formData.college" class="demo-select-base" clearable filterable placeholder="Please select">
        <t-option v-for="(item, index) in collegeOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>

    <t-form-item label="Date" name="date">
      <t-date-picker v-model="formData.date"></t-date-picker>
    </t-form-item>

    <t-form-item label="Personal Website" name="content.url">
      <t-input v-model="formData.content.url" placeholder="Please enter"></t-input>
    </t-form-item>

    <t-form-item label="Personal Profile" help="Please introduce yourself in one sentence" name="description">
      <t-textarea v-model="formData.description" placeholder="Please enter"></t-textarea>
    </t-form-item>

    <t-form-item style="margin-left: 100px">
      <t-space size="10px">
        <t-button theme="primary" type="submit" size="medium">Submit</t-button>
        <t-button theme="default" variant="outline" type="reset" size="medium">Reset</t-button>
        <t-button theme="default" variant="outline" size="medium" @click="handleClear"
          >Clear Validation Results</t-button
        >
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessagePlugin, FormProps, FormInstanceFunctions, CheckboxGroupProps, SelectProps } from 'tdesign-vue-next';

const FORM_RULES: FormProps['rules'] = {
  account: [
    { required: true, message: 'Required', type: 'error', trigger: 'blur' },
    { required: true, message: 'Required', type: 'error' },
    { whitespace: true, message: 'Name cannot be empty' },
  ],
  password: [{ required: true, message: 'Required', type: 'error' }],
  email: [
    { required: true, message: 'Required' },
    { email: { ignore_max_length: true }, message: 'Please enter a valid email address' },
  ],
  gender: [{ required: true, message: 'Required' }],
  course: [{ required: true, message: 'Required' }],
  college: [{ required: true, message: 'Required' }],
  date: [{ required: true, message: 'Required' }],
  'content.url': [
    { required: true, message: 'Required' },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
      message: 'Please enter a valid personal website',
    },
  ],
  description: [{ required: true, message: 'Required' }],
};

const formData: FormProps['data'] = reactive({
  account: '',
  password: '',
  email: '',
  gender: '',
  course: [],
  college: '',
  date: '',
  content: {
    url: '',
  },
  description: '',
});

const form = ref<FormInstanceFunctions>(null);

const courseOptions: CheckboxGroupProps['options'] = [
  { label: 'Chinese', value: '1' },
  { label: 'Math', value: '2' },
  { label: 'English', value: '3' },
  { label: 'PE', value: '4' },
];

const collegeOptions: SelectProps['options'] = [
  { label: 'Computer Science College', value: '1' },
  { label: 'Software College', value: '2' },
  { label: 'Internet of Things College', value: '3' },
];

const onReset: FormProps['onReset'] = () => {
  MessagePlugin.success('Reset successful');
  console.log('formData', formData);
};

const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('Submitted');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.error(firstError);
  }
};

const handleClear = () => {
  form.value.clearValidate();
};
</script>

<style scoped>
.demo-select-base {
  width: 300px;
}
</style>
