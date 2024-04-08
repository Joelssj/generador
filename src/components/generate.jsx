import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import Swal from 'sweetalert2'
import useFormState from './useState';
import PersonalInfoForm from './infoPersonal';
import StateSelection from './state';
import AccessCodeInput from './access';
import styles from '../assets/styles/generateForm.module.css';

function GenerateCurpForm() {
    const {
        formData,
        accessCode,
        inputCode,
        isValidCode,
        showMessage,
        usuarios,
        setUsuarios,
        handleClearForm,
        handleInputChange,
        handleGenderChange,
        handleCodeChange,
        handleSubmit,
        generatePDF
    } = useFormState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dia: '',
        mes: '',
        anio: '',
        genero: '',
        estado: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [rowIndexToDelete, setRowIndexToDelete] = useState(null);

    useEffect(() => {
        const savedUsuarios = localStorage.getItem('usuarios');
        if (savedUsuarios) {
            setUsuarios(JSON.parse(savedUsuarios));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }, [usuarios]);

    const handleDeleteRow = () => {
        const updatedUsuarios = [...usuarios];
        updatedUsuarios.splice(rowIndexToDelete, 1);
        setUsuarios(updatedUsuarios);
        setShowModal(false);
    };
    
    return (
<div>
    <nav>
        <div className="container-fluid">
            <hr />
            <div style={{ width: '200%', height: '2px', background: 'black' }}></div>
        </div>
    </nav>
            <div className={styles.container2}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <PersonalInfoForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleGenderChange={handleGenderChange}
                    />

                    <StateSelection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <AccessCodeInput
                        accessCode={accessCode}
                        inputCode={inputCode}
                        handleCodeChange={handleCodeChange}
                        isValidCode={isValidCode}
                        showMessage={showMessage}
                    />

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleClearForm}>Limpiar</button>
                        <button type="submit" className="btn btn-primary" >Generar CURP</button>

                    </div>
                </form>
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Género</th>
                            <th>Estado</th>
                            <th>CURP</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellidoPaterno}</td>
                                <td>{usuario.apellidoMaterno}</td>
                                <td>{`${usuario.dia}/${usuario.mes}/${usuario.anio}`}</td>
                                <td>{usuario.genero}</td>
                                <td>{usuario.estado}</td>
                                <td>{usuario.curp}</td>
                                <td>
                                <button onClick={() => { setRowIndexToDelete(index); setShowModal(true); }}>
                                Eliminar <FontAwesomeIcon icon={faTrash} />
                                </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar esta fila?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleDeleteRow}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GenerateCurpForm;
