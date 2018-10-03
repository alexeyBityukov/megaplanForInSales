import React from 'react';

export const MegaplanProgramId = props =>
    <div className="megaplan-program-id">
        <form onSubmit={props.onSubmit} >
            <div>
                <label htmlFor="program">Выберите схему</label>
                <select value={props.value} id="program" autoComplete="false" disabled={props.disabled} onChange={props.onChange}>
                    {
                        props.listPrograms
                    }
                </select>
            </div>
            <div>
                <span>{props.error}</span>
            </div>
            <div>
                <span>{props.status}</span>
            </div>
            <div>
                <button>Сохранить схему</button>
            </div>
        </form>
    </div>;