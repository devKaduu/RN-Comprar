import { TouchableOpacityProps } from "react-native";

interface FilterProps extends TouchableOpacityProps {
  status: string;
}

export function Filter() {
  return <div>Filter</div>;
}
