import PropTypes from "prop-types";
import { Row, Col, Alert } from "react-bootstrap";

export default function Messages({ children }) {
	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Alert variant="success">{children}</Alert>
				</Col>
			</Row>
		</>
	);
}

Messages.propTypes = {
	children: PropTypes.string.isRequired,
};
