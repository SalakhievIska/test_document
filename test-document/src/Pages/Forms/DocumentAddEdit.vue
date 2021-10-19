<template>
  <el-form ref="form" :rules="rules" :model="form">

    <el-form-item label="Название" prop="name">
      <el-input v-model="form.name" clearable />
    </el-form-item>

    <el-form-item label="Тип" prop="typeId">
      <el-select v-model="form.typeId"
                 no-data-text="Список пуст!"
                 no-match-text="Не найдено совпадений!"
                 placeholder=" ">
        <el-option v-for="item in types"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Описание" prop="description">
      <el-input type="textarea" v-model="form.description" clearable />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="form.required" label="Обязательный"></el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElSelect,
  ElOption,
} from 'element-plus';

export default ({
  data() {
    return {
      form: {
        name: '',
        description: '',
        required: false,
        typeId: '',
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
    ElForm, ElInput, ElButton, ElFormItem, ElCheckbox, ElSelect, ElOption,
  },
  computed: {
    types() {
      return this.$store.getters.allTypes;
    },
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.commit('createDocument', {
            name: this.form.name,
            description: this.form.description,
            id: this.$store.getters.newDocumentId + 1,
            typeId: this.form.typeId,
          });

          this.$refs.form.resetFields();
          this.$refs.form.clearValidate();

          this.emitter.emit('documentAdd');
        }
      });
    },
  },
  created() {
    this.emitter.on('resetDocumentForm', () => {
      this.$refs.form.resetFields();
    });
  },
});

</script>
