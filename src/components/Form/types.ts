import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
import type { InjectionKey } from "vue";
export type LabelPosition = "left" | "right" | "top";

export interface FormItemProps {
  label?: string; //标签名
  prop?: string; //绑定字段名用于校验 password account
}

export interface FormItemRules extends RuleItem {
  trigger?: string; //触发验证时机
}

export type FormRules = Record<string, FormItemRules[]>;

export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
  labelPosition?: LabelPosition;
}

//表单项暴露给父组件的方法
export interface FormItemContext {
  prop: string;
  validate: (trigger?: string) => Promise<any>;
  resetField(): void;
  clearValidate(): void;
}

//表单暴露给子项的方法，添加和删除字段
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

export interface ValidateStatusProps {
  state: "init" | "success" | "error";
  errorMsg: string;
  loading: boolean;
}

export interface FormValidateFailture {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void;
  clearFields: (props?: string[]) => void;
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProps;
  validate: (trigger?: string) => Promise<any>;
  resetField(): void;
  clearValidate(): void;
}

//注入密钥
export const formContextKey: InjectionKey<FormContext> = Symbol("formContextKey");
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContextKey");
