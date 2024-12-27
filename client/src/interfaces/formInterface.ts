import { FormInstance } from "antd";

export interface IForm{
    visible: boolean; 
    setVisible: (visible: boolean) => void; 
    onCreateUpdate: () => void;
}

export interface TrackFormProps {
    form: FormInstance; 
  }