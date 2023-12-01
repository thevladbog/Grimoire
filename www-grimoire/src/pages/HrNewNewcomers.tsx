import { HrNewcomersForm } from 'src/components/Forms/HrNewcomersForm.tsx';

export const HrNewNewcomers = () => {
  return (
    <>
      <h1>Add new employee</h1>
      <div className="pagePreheaders">
        <p>
          Fill out a form to prepare for a new employee to join the company. The
          questionnaire is filled out only after the new employee accepts the
          pre-offer.
        </p>
        <p>After filling out the form, the following processes are possible:</p>
        <ul>
          <li>sending the finalist questionnaire;</li>
          <li>security check;</li>
          <li>compliance check;</li>
          <li>
            creation of requests for the issuance of equipment and access to
            information systems.
          </li>
        </ul>
      </div>
      <HrNewcomersForm />
    </>
  );
};
