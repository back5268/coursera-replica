import React, { useState } from 'react';
import { Button, CheckBox, Input, Select, Table } from './components/uiCore';
import { InputForm, SelectForm } from './components/form';

export default function App() {
  return (
    <form>
      <InputForm id="ok" label="Ok chua" />
      <Button label="Submit" />
    </form>
  );
}
