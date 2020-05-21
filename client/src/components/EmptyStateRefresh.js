import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import EmptyState from "./EmptyState";
import React from "react"

function emptyStateRefresh({ refreshing, onRefresh, state }) {
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <EmptyState state={state} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  }
});

export default emptyStateRefresh;
