import React, { useEffect, useState } from 'react';
import { Modal, Button, Checkbox } from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';

export default ({ open, setOpen, action }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axiosInstance.get('/api/v1/types');
      let results = response.data;
      results = results.map((result) => {
        return {
          id: result.id,
          value: result.value,
          checked: false,
        };
      });
      setTypes(results);
    };

    fetchTypes();
  }, []);

  const handleCheckboxChange = (index, checked) => {
    const filteredTypes = [...types];
    filteredTypes[index].checked = checked;

    setTypes(filteredTypes);
  };

  const handleSave = () => {
    const typesArr = types
      .filter((type) => type.checked === true)
      .map((type) => type.id);
    action(typesArr);
  };

  if (!types.length) return null;

  const renderContent = () => {
    return types.map((type, index) => {
      return (
        <div className="py-05r" key={type.id}>
          <Checkbox
            label={type.value}
            defaultChecked={type.checked}
            onChange={(e, { checked }) => handleCheckboxChange(index, checked)}
          />
        </div>
      );
    });
  };

  return (
    <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose type of place</Modal.Header>
      <Modal.Content>
        <p>I would like to have ...</p>
        {renderContent()}
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
