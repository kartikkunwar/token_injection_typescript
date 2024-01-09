import { Form } from "react-bootstrap"


const TableForm = () => {
    return (
        <div >
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  placeholder="Enter password here..."/>
                </Form.Group>
            </Form>
        </div>
    )
}

export default TableForm