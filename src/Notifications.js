import React from "react";

const Notifications = (props) => {
    // display notifications in table.
    //check if there available notifications to display else display message "No Notifications available for the selected station"
    return (
        Object.keys(props).length === 0 && props.constructor === Object
            ? <h5>No Notifications available for the selected station</h5>
            :
            <table className="striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Notification</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props).map((key, i) =>

                        <tr key={i} value={key}>
                            <td>{props[key].id}</td>
                            <td>{props[key].message}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    )
}

export default Notifications;