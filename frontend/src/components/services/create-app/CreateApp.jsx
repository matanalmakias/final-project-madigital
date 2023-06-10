import { Form } from "react-bootstrap";
import "./style.css";
import { toast } from "react-toastify";
import { useState } from "react";
import startService from "../../../services/start.service";
import { phoneRegex, webSiteRegex } from "../../../utils/utils";
const CreateApp = () => {
  const [secondStepInput, setSecondStepInput] = useState();
  const [firstStepInput, setFirstStepInput] = useState();
  const [firstStepComplete, setFirstStepComplete] = useState(false);
  const [secondStepComplete, setSecondStepComplete] = useState(false);
  const [thirdStepComplete, setThirdStepComplete] = useState(false);
  const [nameInput, setNameInput] = useState();
  const [phoneInput, setPhoneInput] = useState();
  const [siteInput, setSiteInput] = useState();
  const [errMsg, setErrMsg] = useState("");
  const firstSubmit = (e) => {
    e.preventDefault();
    setFirstStepComplete(true);
  };
  const secondSubmit = (e) => {
    e.preventDefault();
    setSecondStepComplete(true);
  };
  const thirdSubmit = async () => {
    if (phoneRegex.test(phoneInput)) {
      const formData = {
        firstStep: firstStepInput,
        secondStep: secondStepInput,
        name: nameInput,
        phone: phoneInput,
        site: siteInput,
      };
      setThirdStepComplete(true);
      await startService
        .createApp(formData)
        .then((res) => toast(res.data.message));
    } else {
      setErrMsg("מספר הפאלפון לא תקין");
    }
  };
  return (
    <div>
      <p className="p-2 bg-dark text-secondary">{errMsg}</p>
      <div>
        <p className="app_info_text">
          אנחנו מפתחים חנויות/מערכות וכל רעיון לכל מטרה ולכל עסק
        </p>
        {/* First Step */}
        {firstStepComplete === false ? (
          <>
            <Form onSubmit={(e) => firstSubmit(e)}>
              <h3 className="h3">שלב ראשון - מהי מטרת האפליקציה?</h3>
              <div>
                <textarea
                  onChange={(e) => setFirstStepInput(e.target.value)}
                  className="w-100"
                  required
                  placeholder="כתוב תשובה"
                />
              </div>
              <button
                type="submit"
                className="btn mb-2 mt-1  p-1 bg-primary text-white w-100  continue_hover"
              >
                המשך לשלב הבא
              </button>
            </Form>
          </>
        ) : (
          <p
            className="p-1 mb-1
           bg-dark text-white"
          >
            השלב הראשון הושלם
          </p>
        )}
        {/* ------------------------------- */}
        {/* Second Step */}
        {firstStepComplete && (
          <>
            {secondStepComplete === false ? (
              <>
                <Form onSubmit={(e) => secondSubmit(e)}>
                  <h3 className="h3">
                    שלב שני - ספר לי קצת על העסק/הפרוייקט שלך
                  </h3>
                  <div>
                    <textarea
                      onChange={(e) => setSecondStepInput(e.target.value)}
                      className="w-100"
                      required
                      placeholder="כתוב תשובה"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn mb-2 mt-1  p-1 bg-primary text-white w-100  continue_hover"
                  >
                    המשך לשלב הבא
                  </button>
                </Form>
              </>
            ) : (
              <>
                <p className="p-1 mb-1 bg-dark text-white"> השלב השני הושלם</p>
              </>
            )}
          </>
        )}

        {/* ------------------------------- */}
        {/* Third Step */}
        {secondStepComplete && (
          <>
            {thirdStepComplete === false ? (
              <>
                <h3 className="h3">שלב שלישי - פרטים</h3>
                <div>
                  <input
                    onChange={(e) => setNameInput(e.target.value)}
                    className="p-2 mt-1 mb-1 form-control"
                    type="text"
                    placeholder="שם"
                    required
                  />
                  <input
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="p-2 mt-1 mb-1 form-control"
                    type="number"
                    placeholder="מס' פלאפון"
                    required
                  />
                  <input
                    onChange={(e) => setSiteInput(e.target.value)}
                    className="p-2 mt-1 mb-1 form-control"
                    type="text"
                    placeholder="אתר אינטרנט [אופציונלי]"
                  />
                </div>
                <button
                  onClick={() => thirdSubmit()}
                  className="btn mb-2 mt-1  p-1 bg-primary text-white w-100  continue_hover"
                >
                  סיים
                </button>
              </>
            ) : (
              <>
                <p className="p-1 mb-1 bg-dark text-white">השלב השלישי הושלם</p>
                <p className="p-1 mb-1 bg-dark text-white">
                  נחזור אליך בהקדם, תודה רבה על השארת הפרטים!
                </p>
              </>
            )}
          </>
        )}

        {/* ------------------------------- */}
      </div>
    </div>
  );
};

export default CreateApp;
