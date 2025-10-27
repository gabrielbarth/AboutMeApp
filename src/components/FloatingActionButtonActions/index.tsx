import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks';
import { FAB, Portal } from 'react-native-paper';

interface FabActionsProps {
  onPostActivity?: () => void;
  onCreateGroup?: () => void;
}

export const FloatingActionButtonActions: React.FC<FabActionsProps> = ({
  onPostActivity,
  onCreateGroup,
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const actionsPostActivity = [
    {
      icon: (props: { color: string }) => (
        <MaterialCommunityIcons
          name="arm-flex-outline"
          size={24}
          color={props.color}
        />
      ),
      label: 'Postar Atividade',
      onPress: onPostActivity,
    },
  ];
  const actionsCreateGroup = [
    {
      icon: (props: { color: string }) => (
        <MaterialCommunityIcons name="plus" size={24} color={props.color} />
      ),
      label: 'Criar Grupo',
      onPress: onCreateGroup,
    },
  ];
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={onPostActivity ? actionsPostActivity : actionsCreateGroup}
        onStateChange={({ open }) => setOpen(open)}
        fabStyle={[styles.fab, { backgroundColor: theme.colors.button }]}
        color={theme.colors.textInvert}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fab: {
    marginTop: 70, // todo: adjust based on tabs height
    right: 12,
    bottom: 80,
  },
});
