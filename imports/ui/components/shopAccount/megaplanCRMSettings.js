import React from 'react';

export const MegaplanCRMSettings = props =>
    <div className="megaplan-crm-settings">
        <form onSubmit={props.onSubmit} >
            <div className="flex">
                <label htmlFor="program">Выберите схему: </label>
                <select value={props.selectedProgram} id="program" autoComplete="false" disabled={props.disabled} onChange={props.onChangeProgramId}>
                    {
                        props.listPrograms
                    }
                </select>
            </div>
            <div className="flex">
                <label htmlFor="responsible-manager">Выберите ответственного менеджера: </label>
                <select value={props.selectedResponsibleManager} id="responsible-manager" autoComplete="false" disabled={props.disabled} onChange={props.onChangeResponsibleManager}>
                    {
                        props.listResponsibleManagers
                    }
                </select>
            </div>
            <div  className="message-megaplan-authorization">
                {props.error !== undefined ? <span>{'* ' + props.error}</span>: props.status !== undefined &&  <span>{'* ' + props.status}</span>}
            </div>
            <div>
                <button className="update-authorization-data">Сохранить</button>
            </div>
        </form>
    </div>;