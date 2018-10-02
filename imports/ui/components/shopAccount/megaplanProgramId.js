import React from 'react';

export default props =>
    <div className="megaplan-program-id">
        <form onSubmit={props.onSubmit} >
            <div>
                <label htmlFor="program">Выберете схему</label>
                <select id="program" autoComplete="false" disabled={props.disabled}>
                    {
                        props.listPrograms
                    }
                </select>
            </div>
            <div>
                <span>{props.error}</span>
            </div>
            <div>
                <button>Обновить</button>
            </div>
        </form>
    </div>