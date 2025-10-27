import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Portal, Dialog, Text } from 'react-native-paper';

interface DateTimePickerInputProps {
  label?: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: any;
}

const DateTimePickerInput = ({
  label = 'Data e horário',
  value,
  onChange,
  error,
  errorMessage,
  containerStyle,
}: DateTimePickerInputProps) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  const formatDate = (date: Date) =>
    date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={containerStyle}>
      <TextInput
        label={label}
        value={value ? `${formatDate(value)} ${formatTime(value)}` : ''}
        onFocus={() => setShowDate(true)}
        right={
          <TextInput.Icon icon="calendar" onPress={() => setShowDate(true)} />
        }
        error={error}
        editable={false}
      />
      {error && errorMessage ? (
        <Text variant="bodyMedium" style={{ color: 'red', marginTop: 4 }}>
          {errorMessage}
        </Text>
      ) : null}

      <Portal>
        <Dialog visible={showDate} onDismiss={() => setShowDate(false)}>
          <Dialog.Title>Selecione a data</Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Button
                onPress={() =>
                  setTempDate(
                    new Date(tempDate.setDate(tempDate.getDate() - 1)),
                  )
                }>
                -
              </Button>
              <Text variant="bodyMedium">{formatDate(tempDate)}</Text>
              <Button
                onPress={() =>
                  setTempDate(
                    new Date(tempDate.setDate(tempDate.getDate() + 1)),
                  )
                }>
                +
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDate(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                setShowDate(false);
                setShowTime(true);
              }}>
              Próximo
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={showTime} onDismiss={() => setShowTime(false)}>
          <Dialog.Title>Selecione o horário</Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Button
                onPress={() =>
                  setTempDate(
                    new Date(tempDate.setHours(tempDate.getHours() - 1)),
                  )
                }>
                -1h
              </Button>
              <Text variant="bodyMedium">{formatTime(tempDate)}</Text>
              <Button
                onPress={() =>
                  setTempDate(
                    new Date(tempDate.setHours(tempDate.getHours() + 1)),
                  )
                }>
                +1h
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Button
                onPress={() =>
                  setTempDate(
                    new Date(tempDate.setMinutes(tempDate.getMinutes() - 10)),
                  )
                }>
                -10m
              </Button>
              <Button
                onPress={() =>
                  setTempDate(
                    new Date(tempDate.setMinutes(tempDate.getMinutes() + 10)),
                  )
                }>
                +10m
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTime(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                setShowTime(false);
                onChange(new Date(tempDate));
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export { DateTimePickerInput };
