export const ui = {
  button: {
    primary: {
      padding: '8px 12px',
      borderRadius: 6,
      border: 'none',
      background: '#2563eb',
      color: '#fff',
      cursor: 'pointer',
    },
    danger: {
      padding: '8px 12px',
      borderRadius: 6,
      border: 'none',
      background: '#dc2626',
      color: '#fff',
      cursor: 'pointer',
    },
    success: {
      padding: '8px 12px',
      borderRadius: 6,
      border: 'none',
      background: '#16a34a',
      color: '#fff',
      cursor: 'pointer',
    },
    ghost: (dark: boolean) => ({
      padding: '8px 12px',
      borderRadius: 6,
      border: '1px solid #888',
      background: 'transparent',
      color: dark ? '#fff' : '#111',
      cursor: 'pointer',
    }),
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    width: '100%',
  },

  card: (dark: boolean) => ({
    padding: 16,
    borderRadius: 12,
    background: dark ? '#111827' : '#fff',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  }),
};
