import { FlatList, Image, Text, TouchableOpacity, View, Alert } from "react-native";

import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { Item } from "@/components/Item";
import { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";
import { useState } from "react";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

type ItemType = {
  id: string;
  description: string;
  status: FilterStatus;
};

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemType[]>([]);

  function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar um item.");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description: description,
      status: FilterStatus.PENDING,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setDescription("");
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" value={description} onChangeText={setDescription} />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive={filter === status} onPress={() => setFilter(status)} />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item data={item} onRemove={() => {}} onStatus={() => {}} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.emptyText}>Nenhum item encontrado</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
