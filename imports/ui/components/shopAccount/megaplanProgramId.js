import React from 'react';

export const MegaplanProgramId = props =>
    <div className="megaplan-program-id">
        <form onSubmit={props.onSubmit} >
            <div className="flex">
                <label htmlFor="program">Выберите схему: </label>
                <select value={props.value} id="program" autoComplete="false" disabled={props.disabled} onChange={props.onChange}>
                    {
                        props.listPrograms
                    }
                </select>
            </div>
            <div  className="message-megaplan-authorization">
                {props.error !== undefined ? <span>{'* ' + props.error}</span>: props.status !== undefined &&  <span>{'* ' + props.status}</span>}
            </div>
            <div>
                <button className="update-authorization-data">Сохранить схему</button>
            </div>
        </form>
    </div>;