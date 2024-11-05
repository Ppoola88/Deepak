import { test, expect } from '@playwright/test';
import { BasePage } from '../../../pages/page/1_BasePage.ts';
import { PaymentoptionsPage } from '../../../pages/page/9_Payments.ts';
import { QualificationPage } from '../../../pages/page/2_QualificationPage.ts';
import { ZipCodeWhoiscoverageforPage } from '../../../pages/OE/page/3_ZipCodeWhoiscoverageforPage.ts';
import { Shopandselect } from '../../../pages/page/4_Shopandselect.ts';
import { Createyouraccount } from '../../../pages/page/5_Createyouraccount.ts';
import { Applicantinformation } from '../../../pages/page/6_Applicantinformation.ts';
//import { DentalFamilymembersInfo } from '../../pages/page/DentalFamilymembersInfo.ts';
import { CurrentandPreviousHealthPlanInformation } from '../../../pages/page/8_CurrentandPreviousHealthPlanInformation.ts';
import { Upload_Supportdocument } from '../../../pages/page/8_Upload_Supportdocument.ts';
import { VerificationSubmission } from '../../../pages/page/10_Verifyandsubmission.ts';
import { DentalApplicationinformation } from '../../../pages/page/1_dent_StartDentalEnrollment.ts';
import { Dent_Currentmeicalinfo } from '../../../pages/page/2_Dent_Currentmedicalinfo.ts';
import { Dent_Current_previous_medicalcvrgg } from '../../../pages/page/3_Dent_current_previois_dentalinsurancecvrg.ts';
import { Dent_your_payment_options } from '../../../pages/page/4_Dent_your_payment_options.ts';
import { Dentalconfirmationapplication } from '../../../pages/page/5_Dent_confirm_your_application.ts';

import { Familymembers } from '../../../pages/page/7_Familymembers.ts';
import { CurrentMedicalINfo } from '../../../pages/page/CurrentMedicalInfo.ts';
import { Dent_SubmitDentalPlan } from '../../../pages/page/6_Dent_SubmitDentalPlanForm.ts';
import { getDate, getDay } from 'date-fns';
import { HealthPartners as fakehealthPartners } from '../../../Fixtures/InsuranceFixture.ts';
import { allure } from 'allure-playwright';



const fakeValue = {
  ...fakehealthPartners(),
};

test.setTimeout(180000);
test('109C Open Enrollement Single Plus Dental', async ({ page }) => {
  const basePage = new BasePage(page);
  const paymentOptions = new PaymentoptionsPage(page);
  const qualificationPage = new QualificationPage(page);
  const zipCodeWhoiscoverageforPage = new ZipCodeWhoiscoverageforPage(page);
  const shopandselect = new Shopandselect(page);
  const createyouraccount = new Createyouraccount(page);
  const applicantInfo = new Applicantinformation(page);
  const DentalApplicationinformation1 = new DentalApplicationinformation(page);
  const currentPreviousDentInfo = new CurrentandPreviousHealthPlanInformation(page);
  const uploadSupportdocument = new Upload_Supportdocument(page);
  const verificationSubmission = new VerificationSubmission(page);
 // const dentalEnrollment = new DentalEnrollment(page);
  const familyMembers = new Familymembers(page);
  const currentMedicalInfo = new CurrentMedicalINfo(page);
  const Dent_submitDentalPlan = new Dent_SubmitDentalPlan(page);
  const Dent_Currentmedicalinfo = new Dent_Currentmeicalinfo(page);
  const Dent_current_previois_dentalinsurancecvrg = new Dent_Current_previous_medicalcvrgg(page);
  const Dent_your_payment_optionss = new Dent_your_payment_options(page);
  const Dent_confirmapplication = new Dentalconfirmationapplication(page);
  const LastName = fakeValue.lastNameLocator18;
  const Eventdate = fakeValue.sixtyDaysAgo;
  // Test Case ID:7208
  allure.label('feature', '109C Open Enrollement Single Plus Dental');
  allure.severity('critical');

    await basePage.navigateToWelcomePage_QA();
    //await expect(page).toHaveURL('https://individualinsurance-stg.healthpartners.com/hp/shopping/anonymous.html#welcome');
    await basePage.clickGetStartedLink();
    await qualificationPage.seeIfYouQualify_OE();
    //await expect(page).toHaveURL("https://individualinsurance-stg.healthpartners.com/hp/shopping/anonymous.html#view/account/WhosCoveredSEOpt/Demographics");
    await zipCodeWhoiscoverageforPage.fillZipCode('55425');
    await zipCodeWhoiscoverageforPage.Fillpolicyholder('PolicyHolder',LastName,'1/1/2000','P','No');
    await zipCodeWhoiscoverageforPage.clickContinueLink();
    await shopandselect.selectBrowseAllPlans();
    await shopandselect.addMandDPlanToCart();
    await shopandselect.enrollNow();
    // await shopandselect.startenrollNow();
    await createyouraccount.fillEmailAddress('109C@healthpartnersteam402792.testinator.com');
    await createyouraccount.userIDAndPassword(LastName+'12');
    await createyouraccount.securityQuestionAndBroker();
    await applicantInfo.startEnrolment('P','8170 33rd Ave S','#123','Bloomington','4516','952-883-6000','1','952-883-5000','2');
    await applicantInfo.SSN(fakeValue.SSN);
    await applicantInfo.Continue();
    await applicantInfo.popup();
    await currentPreviousDentInfo.planInformation_Policyholder_no();
    await currentPreviousDentInfo.continue();

    await paymentOptions.employerofferedreimbursement_no();
    await paymentOptions.paymentOptions_withdrawfrombank_checking(LastName,LastName,'102101645','12345678901');
    await paymentOptions.continue();
    await verificationSubmission.verifySubmission();
    await verificationSubmission.submitFormpolicyholder(LastName,'P');
    await verificationSubmission.submitform();
    await verificationSubmission.applnSubmitted();
    await verificationSubmission.enrollmentSummary(); 

    //Dental
    await DentalApplicationinformation1.startDentalEnrollment_address('P','8170 33rd Ave S','#123','Bloomington','4516','952-883-6000','1','952-883-5000','2');
    await DentalApplicationinformation1.SSN(fakeValue.SSN);
    await DentalApplicationinformation1.Have_you_ever_been_a_HealthPartners_member_no();
    await DentalApplicationinformation1.startDentalEnrollment_address_mailing_yes();
    await DentalApplicationinformation1.enrollmentPageOneSave();
    await DentalApplicationinformation1.popup();
    await Dent_Currentmedicalinfo.Do_all_persons_applyingforcvrghold_comprehensive_yes();
    await Dent_Currentmedicalinfo.Do_all_persons_applyingforcvrghold_comprehensive_insure(LastName,'8170 33rd Ave S','#123','Bloomington','55124','9528836000');
    await Dent_Currentmedicalinfo.continue();
    await Dent_current_previois_dentalinsurancecvrg.Haveyouhadcomparabledental_inlast_3months_no();
    await Dent_current_previois_dentalinsurancecvrg.continue();
    await Dent_your_payment_optionss.Dent_paymentOptions_withdrawfrombank_checking(LastName,LastName,'102101645','12345678901');
    await Dent_your_payment_optionss.continue();
    await Dent_confirmapplication.Dent_confirmation_application();
    await Dent_submitDentalPlan.dent_submityourapplication(LastName,'P');
    await Dent_submitDentalPlan.submitFormDent();
    await Dent_submitDentalPlan.gotoAccount();
});