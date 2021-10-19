<template>
  <el-form ref="form" :rules="rules" :model="form">

    <el-form-item label="Название" prop="name">
      <el-input v-model="form.name" clearable />
    </el-form-item>

    <el-form-item label="Описание" prop="description">
      <el-input type="textarea" v-model="form.description" clearable />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import {
  ElForm, ElFormItem, ElInput, ElButton,
} from 'element-plus';

export default ({
  data() {
    return {
      form: {
        name: '',
        description: '',
      },
      rules: {
        name: [
          {
            required: true, message: 'Обязательное поле', trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Название должно быть от 3 до 20 символов',
            trigger: 'change',
          },
        ],
        description: [
          {
            max: 200,
            message: 'Описание должно быть до 200 символов',
            trigger: 'change',
          },
        ],
      },
    };
  },
  components: {
    ElForm, ElInput, ElButton, ElFormItem,
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const newTypeId = this.$store.getters.newTypeId + 1;
          this.$store.commit('createType', {
            name: this.form.name,
            description: this.form.description,
            id: newTypeId,
          });

          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();

          this.emitter.emit('typeAdd', newTypeId);
        }
      });
    },
  },
  created() {
    this.emitter.on('resetTypeForm', () => {
      this.$refs.form.resetFields();
    });
  },
});

</script>
