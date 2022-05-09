import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../../constants/api";
import Heading from "../../layout/Heading";

import {
	MINIMUM_FIRST_NAME_CHARACTERS,
	MINIMUM_LAST_NAME_CHARACTERS,
	MINIMUM_SUBJECT_CHARACTERS,
	MINIMUM_MESSAGE,
	EMAIL_REGEX,
} from "../../../constants/registration";

const schema = yup.object().shape({
	firstName: yup
		.string()
		.required("Please enter your name")
		.min(
			MINIMUM_FIRST_NAME_CHARACTERS,
			`Your First name must be at least ${MINIMUM_FIRST_NAME_CHARACTERS} characters`
		),
	lastName: yup
		.string()
		.min(
			MINIMUM_LAST_NAME_CHARACTERS,
			`Your Last name must be at least ${MINIMUM_LAST_NAME_CHARACTERS} characters`
		),
	email: yup
		.string("Please enter your email")
		.matches(EMAIL_REGEX, "Your email is not valid"),
	subject: yup
		.string()
		.required("Please enter subject")
		.min(
			MINIMUM_SUBJECT_CHARACTERS,
			`Your subject must be at least ${MINIMUM_SUBJECT_CHARACTERS} characters`
		),
	checkInDate: yup.date().nullable().typeError("Please enter Check-in date"),
	checkOutDate: yup
		.date()
		.nullable()
		.typeError("Please enter Check-out date"),
	message: yup
		.string("Please enter your message here")
		.min(
			MINIMUM_MESSAGE,
			`Your message must be at least ${MINIMUM_MESSAGE} characters`
		),
	refHotelTitle: yup.string(),
});

export default function Enquiry({ title }) {
	const navigate = useNavigate();
	const url = BASE_URL + "api/enquiries";

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	console.log(errors);

	async function onSubmit(data) {
		console.log(data);

		const formData = new FormData();

		const inputData = {
			firstName: data.firstName,
			lastName: data.lastName,
			checkInDate: data.checkInDate,
			checkOutDate: data.checkOutDate,
			email: data.email,
			subject: data.subject,
			message: data.message,
			refHotelTitle: data.refHotelTitle,
		};

		formData.append("data", JSON.stringify(inputData));

		try {
			const response = await axios.post(url, formData);
			console.log("response", response.data);
			navigate("/hotel");
		} catch (error) {
			console.log("error", error);
		}
	}

	return (
		<>
			<Row>
				<Col sm className="text-center mb-5 heading__bg--yellow">
					<Heading title={title} />
				</Col>
			</Row>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<Form.Group className="mb-3">
						<Form.Control
							name="refHotelTitle"
							value={title}
							onChange={(e) => (e.target.value = title)}
							type="hidden"
							{...register("refHotelTitle")}
						/>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							name="firstName"
							placeholder="First Name"
							{...register("firstName")}
						/>
						<Form.Text className="text-muted">
							Your name must be at least &nbsp;
							{MINIMUM_FIRST_NAME_CHARACTERS}&nbsp;characters.
							{errors.firstName && (
								<FormError>
									{errors.firstName.message}
								</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							name="lastName"
							placeholder="Last Name"
							{...register("lastName")}
						/>
						<Form.Text className="text-muted">
							Your name must be at least &nbsp;
							{MINIMUM_LAST_NAME_CHARACTERS}&nbsp;characters.
							{errors.lastName && (
								<FormError>{errors.lastName.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							className="form-control"
							placeholder="Email"
							{...register("email")}
						/>
						<Form.Text className="text-muted">
							Please enter en valid email address
							{errors.email && (
								<FormError>{errors.email.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Check-In Date</Form.Label>
						<Form.Control
							name="checkInDate"
							type="date"
							onChange={(e) => e.target.value}
							className="form-control"
							placeholder="dd-mm-yyyy"
							{...register("checkInDate")}
						/>
						<Form.Text className="text-muted">
							{errors.checkInDate && (
								<FormError>
									{errors.checkInDate.message}
								</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Check-Out Date</Form.Label>
						<Form.Control
							name="checkOutDate"
							type="date"
							onChange={(e) => e.target.value}
							className="form-control"
							placeholder="dd-mm-yyyy"
							{...register("checkOutDate")}
						/>
						<Form.Text className="text-muted">
							{errors.checkOutDate && (
								<FormError>
									{errors.checkOutDate.message}
								</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Subject</Form.Label>
						<Form.Control
							name="subject"
							placeholder="Subject"
							{...register("subject")}
						/>
						<Form.Text className="text-muted">
							Your subject must be at least &nbsp;
							{MINIMUM_SUBJECT_CHARACTERS}&nbsp;characters.
							{errors.subject && (
								<FormError>{errors.subject.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Message</Form.Label>
						<Form.Control
							as="textarea"
							name="message"
							aria-label="With textarea"
							className="form-control"
							placeholder="Message"
							{...register("message")}
						/>
						<Form.Text className="text-muted">
							Your message must be at least&nbsp;
							{MINIMUM_MESSAGE}&nbsp;characters
							{errors.message && (
								<FormError>{errors.message.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Button type="submit" className="mb-2">
						Submit
					</Button>
				</fieldset>
			</Form>
		</>
	);
}

Enquiry.propTypes = {
	id: PropTypes.number,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	subject: PropTypes.string,
	message: PropTypes.string,
	checkInDate: PropTypes.instanceOf(Date),
	checkOutDate: PropTypes.instanceOf(Date),
};
