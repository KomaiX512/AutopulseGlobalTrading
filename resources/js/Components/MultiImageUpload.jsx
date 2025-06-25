import { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";


function MultiImageUpload({ dataSources, onUpload, onSelect, onRemove }) {

  const [visible, setVisible] = useState(false);

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <div className="App">
      <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
        dataSources={dataSources}
      />
    </div>
  );
}

export default MultiImageUpload;