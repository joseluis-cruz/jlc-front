import { Button } from "react-bootstrap";
import { GoogleLogout } from "react-google-login";
import { Entorno } from "../../utils/Entorno";

export { CLogout }

interface LogoutProps {
    readonly onLogoutSuccess?: () => void;
}

function CLogout (props: LogoutProps)
{
    return (
        <GoogleLogout
            clientId = { Entorno.GOOGLE_CLIENT_ID }
            render = { renderProps => (
            <Button onClick= { renderProps.onClick} disabled={renderProps.disabled } >
                Logout
            </Button>
            )}
            onLogoutSuccess={props.onLogoutSuccess}
        />
    );
}