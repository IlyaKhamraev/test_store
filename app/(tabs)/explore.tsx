import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ProductsList } from "@/components/ui/ProductsList";
import { products } from "@/constants/data";

const TabTwoScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        <ThemedText style={styles.titleContainer} type="title">
          Товары
        </ThemedText>

        <ProductsList products={products} />
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    fontSize: 26,
    marginBottom: 20,
  },
});

export default TabTwoScreen;
