const rules = () => ({
  email: {
    required: 'O email está incorreto. Verifique se digitou corretamente.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'O email está incorreto. Verifique se digitou corretamente.',
    },
  },
  name: {
    required: 'É obrigatório incluir um nome',
  },
  password: {
    required: 'Senha obrigatória',
  },
  confirmPassword: {
    required: 'As senhas não coincidem. Tente digitar novamente.',
    validate: (value?: string, valueConfirmation?: string) =>
      value === valueConfirmation ||
      'As senhas não coincidem. Tente digitar novamente.',
  },
});

export { rules };
