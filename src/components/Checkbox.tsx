import style from "./Checkbox.module.css";

export default function Checkbox({ checked, onChange }: { checked: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return <input name="ckb-task-completed" className={style.checkbox} type="checkbox" checked={checked} onChange={onChange} />;
}
