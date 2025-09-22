import type { Template } from '../types';

const RFP_TEMPLATE = `<h1>Request for Proposal (RFP)</h1>
<p><strong>RFP Title:</strong> [Enter RFP Title, e.g., Enterprise Resource Planning System]</p>
<p><strong>RFP Number:</strong> [Enter RFP Number]</p>
<p><strong>Issued Date:</strong> [Date]</p>
<p><strong>Questions Due Date:</strong> [Date, Time, Timezone]</p>
<p><strong>Proposal Closing Date:</strong> [Date, Time, Timezone]</p>
<hr>
<h2>1. Executive Summary</h2>
<p>[Company Name] ("the Company") is soliciting proposals for [briefly describe the project or service, e.g., the selection and implementation of a new Enterprise Resource Planning (ERP) system].</p>
<p>We are a [brief description of your company, e.g., global leader in sustainable packaging] seeking a partner to [state the high-level goal, e.g., modernize our core business processes and improve data visibility across the organization].</p>
<p>This Request for Proposal (RFP) provides detailed information about our requirements, the proposal submission process, and the criteria for evaluation.</p>
<h2>2. Confidentiality</h2>
<p>This RFP and all information provided herein are confidential and proprietary to the Company. Recipients may not disclose this information to any third party without the express written consent of the Company. All respondents are expected to handle the information with the utmost discretion.</p>
<h2>3. Company Background</h2>
<p>[Provide a more detailed overview of your organization, its mission, the market it operates in, and any relevant context that would help vendors understand your needs better. For example, include your history, size, locations, and strategic goals.]</p>
<h2>4. Project Goals and Scope of Work</h2>
<p>The following sections detail the objectives, scope, and deliverables for this project.</p>
<h3>4.1. Primary Objectives</h3>
<p>The primary objectives of this project are:</p>
<ul>
    <li><strong>Objective 1:</strong> [e.g., To improve operational efficiency by 20% within the first year of implementation.]</li>
    <li><strong>Objective 2:</strong> [e.g., To reduce manual data entry and associated errors by automating key financial workflows.]</li>
    <li><strong>Objective 3:</strong> [e.g., To provide a single source of truth for business analytics, enabling better decision-making.]</li>
    <li><strong>Objective 4:</strong> [Add other key objectives as needed.]</li>
</ul>
<h3>4.2. Detailed Scope of Work</h3>
<p>The selected vendor will be responsible for the following tasks and deliverables, organized by project phase:</p>
<ul>
    <li><strong>Phase 1: Discovery & Planning</strong>
        <ul>
            <li>Conduct detailed requirements workshops with key stakeholders.</li>
            <li>Develop a comprehensive project plan, including timelines and resource allocation.</li>
            <li>Perform a gap analysis of current vs. future state.</li>
        </ul>
    </li>
    <li><strong>Phase 2: Implementation & Configuration</strong>
        <ul>
            <li>Install and configure all necessary software in development, testing, and production environments.</li>
            <li>Manage data migration from legacy systems.</li>
            <li>Integrate the solution with existing critical applications, such as [e.g., Salesforce, ADP].</li>
        </ul>
    </li>
    <li><strong>Phase 3: Testing & Training</strong>
        <ul>
            <li>Develop and execute a User Acceptance Testing (UAT) plan.</li>
            <li>Provide comprehensive training for end-users and system administrators.</li>
            <li>Offer dedicated go-live support.</li>
        </ul>
    </li>
    <li><strong>Phase 4: Post-Launch Support</strong>
        <ul>
            <li>Detail the proposed model for ongoing support and maintenance.</li>
            <li>Define the Service Level Agreement (SLA) for issue resolution.</li>
        </ul>
    </li>
</ul>
<h3>4.3. Key Deliverables</h3>
<ul>
    <li>Detailed Project Plan</li>
    <li>Configured Production Environment</li>
    <li>Successful Data Migration Report</li>
    <li>User Training Manuals & Materials</li>
    <li>Monthly Post-Launch Performance Reports</li>
</ul>
<h3>4.4. Project Timeline</h3>
<table border="1" style="width:100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Milestone</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Date</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">RFP Issued</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Date]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Vendor Questions Due</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Date]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Company Responds to Questions</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Date]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Proposals Due</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Date]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Vendor Presentations (Shortlist)</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Date Range]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Vendor Selection</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Date]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Project Kick-off</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Target Date]</td>
        </tr>
    </tbody>
</table>
<h2>5. Proposal Submission Requirements</h2>
<h3>5.1. Submission Instructions</h3>
<ul>
    <li>Proposals must be submitted electronically to <strong>[Email Address]</strong>.</li>
    <li>The email subject line must be: <strong>"RFP Response: [RFP Title] - [Vendor Name]"</strong>.</li>
    <li>Proposals must be received no later than the closing date and time specified above. Late submissions will not be considered.</li>
    <li>The proposal should be submitted in <strong>two separate files</strong>: one for the Technical Proposal and one for the Pricing Proposal.</li>
</ul>
<h3>5.2. Format and Content</h3>
<p><strong>Part 1: Technical Proposal (PDF Format)</strong></p>
<ul>
    <li><strong>Cover Letter:</strong> A brief introduction signed by an authorized representative of your company.</li>
    <li><strong>Company Overview:</strong> Describe your company, its history, financial stability, and relevant experience in similar projects.</li>
    <li><strong>Project Understanding:</strong> Demonstrate your understanding of our objectives and requirements.</li>
    <li><strong>Proposed Solution:</strong> Detail your technical approach, methodology, and the products/services you will use.</li>
    <li><strong>Project Team:</strong> Provide biographies of key personnel who will be assigned to this project, outlining their roles and experience.</li>
    <li><strong>Project Plan & Timeline:</strong> A detailed plan with milestones and deliverables.</li>
    <li><strong>References:</strong> Provide at least three client references for similar projects completed within the last three years.</li>
</ul>
<p><strong>Part 2: Pricing Proposal (PDF Format)</strong></p>
<ul>
    <li>Provide a detailed, itemized breakdown of all costs.</li>
    <li>Clearly distinguish between one-time fees (e.g., software, implementation, training) and recurring fees (e.g., licensing, support, maintenance).</li>
    <li>All prices should be quoted in <strong>[Currency, e.g., USD]</strong> and be valid for a minimum of 90 days.</li>
</ul>
<h2>6. Evaluation Criteria</h2>
<p>Proposals will be evaluated by an internal committee based on the following weighted criteria:</p>
<table border="1" style="width:100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Criteria</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Weight</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Technical Solution & Fit</td>
            <td style="border: 1px solid #ccc; padding: 8px;">40%</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Vendor Experience & Refs</td>
            <td style="border: 1px solid #ccc; padding: 8px;">25%</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Project Plan & Team</td>
            <td style="border: 1px solid #ccc; padding: 8px;">15%</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Pricing</td>
            <td style="border: 1px solid #ccc; padding: 8px;">20%</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>Total</strong></td>
            <td style="border: 1px solid #ccc; padding: 8px;"><strong>100%</strong></td>
        </tr>
    </tbody>
</table>
<p>The evaluation process will consist of a review of written proposals, followed by presentations from a shortlist of qualified vendors.</p>
<h2>7. Terms and Conditions</h2>
<ul>
    <li>The Company reserves the right to accept or reject any or all proposals for any reason.</li>
    <li>This RFP does not commit the Company to award a contract.</li>
    <li>All proposals become the property of the Company upon receipt.</li>
    <li>The selected vendor will be required to enter into a Master Services Agreement with the Company.</li>
</ul>
<h2>8. Contact Information</h2>
<p>All inquiries regarding this RFP must be directed in writing to:</p>
<ul>
    <li><strong>Name:</strong> [Contact Name]</li>
    <li><strong>Title:</strong> [Contact Title]</li>
    <li><strong>Email:</strong> [Contact Email]</li>
</ul>
`;

const RFQ_TEMPLATE = `<h1>Request for Quotation (RFQ)</h1>
<p><strong>To:</strong> [Supplier Name]<br>
<strong>From:</strong> [Your Company Name]<br>
<strong>Address:</strong> [Your Company Address]<br>
<strong>RFQ Number:</strong> [Number]<br>
<strong>Date:</strong> [Date]</p>
<hr>
<h2>1. Product/Service Specifications</h2>
<p>Please provide a quotation for the following items. Please be as detailed as possible, including manufacturer, part numbers, and any relevant technical specifications to ensure accuracy.</p>
<table border="1" style="width:100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Item No.</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Part No. / SKU</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Description</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Quantity</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Unit of Measure</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">1</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Part Number]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Detailed Item 1 Description]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Qty]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[e.g., Each]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">2</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Part Number]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Detailed Item 2 Description]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Qty]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[e.g., Case]</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">3</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Part Number]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Detailed Item 3 Description]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[Qty]</td>
            <td style="border: 1px solid #ccc; padding: 8px;">[e.g., Meter]</td>
        </tr>
    </tbody>
</table>
<h2>2. Pricing</h2>
<p>Provide a detailed, itemized quotation. All prices are to be in <strong>[Currency, e.g., USD]</strong> and should be inclusive of all charges except where noted separately below.</p>
<table border="1" style="width:100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Item No.</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Unit Price</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Total Price</th>
        </tr>
    </thead>
    <tbody>
        <tr><td style="border: 1px solid #ccc; padding: 8px;">1</td><td style="border: 1px solid #ccc; padding: 8px;"></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
        <tr><td style="border: 1px solid #ccc; padding: 8px;">2</td><td style="border: 1px solid #ccc; padding: 8px;"></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
        <tr><td style="border: 1px solid #ccc; padding: 8px;">3</td><td style="border: 1px solid #ccc; padding: 8px;"></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
        <tr><td colspan="2" style="border: 1px solid #ccc; padding: 8px;"><strong>Subtotal</strong></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
        <tr><td colspan="2" style="border: 1px solid #ccc; padding: 8px;"><strong>Taxes (if applicable)</strong></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
        <tr><td colspan="2" style="border: 1px solid #ccc; padding: 8px;"><strong>Shipping & Handling</strong></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
        <tr><td colspan="2" style="border: 1px solid #ccc; padding: 8px;"><strong>TOTAL</strong></td><td style="border: 1px solid #ccc; padding: 8px;"></td></tr>
    </tbody>
</table>
<h2>3. Delivery and Shipping</h2>
<ul>
    <li><strong>Delivery Address:</strong> [Full Shipping Address, including contact person and phone number]</li>
    <li><strong>Required Delivery Date:</strong> All items must be delivered on or before <strong>[Date]</strong>.</li>
    <li><strong>Shipping Terms (Incoterms 2020):</strong> [e.g., DDP (Delivered Duty Paid)]</li>
    <li><strong>Partial Shipments:</strong> [Allowed / Not Allowed]</li>
</ul>
<h2>4. Payment Terms</h2>
<p>Our standard payment terms are <strong>[e.g., Net 30 days]</strong> after receipt of goods and a valid invoice. Please confirm if you can meet these terms. If not, please state your proposed payment terms.</p>
<h2>5. Submission Instructions</h2>
<ul>
    <li><strong>Quote Valid Until:</strong> Your quotation must remain valid until at least <strong>[Date, e.g., 60 days from submission]</strong>.</li>
    <li><strong>Submission:</strong> Please send your complete quotation to <strong>[Email Address]</strong> by <strong>[Date and Time]</strong>.</li>
    <li><strong>Reference:</strong> Please include the RFQ Number <strong>[Number]</strong> in the subject line of your email.</li>
</ul>
<h2>6. Terms and Conditions</h2>
<ul>
    <li>All items must be new and in original packaging.</li>
    <li>Please provide details on the manufacturer's warranty for each item.</li>
    <li>[Your Company Name] reserves the right to accept or reject any or all of the quotation.</li>
    <li>This RFQ is not a commitment to purchase. A formal Purchase Order will be issued upon acceptance of the quotation.</li>
</ul>
<p><strong>For any questions, please contact:</strong> [Contact Name, Email, Phone]</p>
`;

const RFI_TEMPLATE = `<h1>Request for Information (RFI)</h1>
<p><strong>RFI Title:</strong> [Enter RFI Title, e.g., Cloud-Based CRM Solutions]<br>
<strong>RFI Number:</strong> [Enter RFI Number]<br>
<strong>Issued Date:</strong> [Date]<br>
<strong>Response Deadline:</strong> [Date, Time, Timezone]</p>
<hr>
<h2>1. Purpose and Disclaimer</h2>
<h3>1.1. Purpose</h3>
<p>[Your Company Name] is gathering information for a potential future project related to [Project Name/Description, e.g., enhancing our customer relationship management capabilities]. The purpose of this RFI is to understand the capabilities of various vendors and the range of solutions available in the market. This will help us to refine our requirements for a potential future procurement process (e.g., an RFP or RFQ).</p>
<h3>1.2. Disclaimer</h3>
<p>This RFI is issued for information and planning purposes only and <strong>does not constitute a solicitation</strong>. A response to this RFI is not an offer and cannot be accepted by the Company to form a binding contract. The Company is not responsible for any costs incurred by respondents in the preparation of their response.</p>
<h2>2. Background Information</h2>
<p>[Provide a brief overview of your company, the current situation, the problem you are trying to solve, or the opportunity you are exploring. The more context you provide, the more relevant the responses will be. Include details about your industry, company size, and current systems/processes.]</p>
<h2>3. Information Requested</h2>
<p>Please provide detailed responses to the following questions. We encourage you to be concise and specific.</p>
<h3>A. Company Information</h3>
<ol>
    <li><strong>Company Overview:</strong> Provide your legal name, headquarters address, years in business, and a brief mission statement.</li>
    <li><strong>Relevant Experience:</strong> Briefly describe your experience with companies of similar size and in a similar industry to ours. Please highlight 2-3 key projects.</li>
</ol>
<h3>B. Solution Overview</h3>
<ol>
    <li><strong>Product/Service Description:</strong> Describe the features, functionalities, and key differentiators of your solution. What core problems does it solve?</li>
    <li><strong>Technology:</strong> Describe the underlying technology stack, architecture, and deployment model (e.g., Multi-tenant SaaS, on-premise, hybrid).</li>
    <li><strong>Integration:</strong> What are your solution's capabilities for integrating with other systems (e.g., via APIs, pre-built connectors)?</li>
</ol>
<h3>C. Implementation and Support</h3>
<ol>
    <li><strong>Implementation:</strong> Describe a typical implementation process, methodology, and estimated timeline for a company of our size.</li>
    <li><strong>Training:</strong> What training options are available for end-users and administrators (e.g., online, in-person, train-the-trainer)?</li>
    <li><strong>Support:</strong> Describe your customer support model, including hours of operation, standard SLAs, and support channels (e.g., phone, email, portal).</li>
</ol>
<h3>D. Pricing Model</h3>
<ol>
    <li><strong>Structure:</strong> Explain your pricing structure (e.g., per-user subscription, one-time license fee, usage-based). Are there different pricing tiers?</li>
    <li><strong>Indicative Costs:</strong> Provide a non-binding, indicative cost estimate (or range) for a company of our size ([e.g., X employees, Y revenue]). This is for budgetary planning purposes only.</li>
</ol>
<h3>E. Customer References</h3>
<ol>
    <li>Please provide 2-3 examples of customers in a similar industry who are using your solution. Case studies or links to public reviews are welcome.</li>
</ol>
<h2>4. Submission Guidelines</h2>
<ul>
    <li><strong>Response Deadline:</strong> All responses must be received by <strong>[Date and Time]</strong>.</li>
    <li><strong>Format:</strong> Responses should be submitted in a single PDF document.</li>
    <li><strong>Submission:</strong> Please submit your response electronically to <strong>[Email Address]</strong> with the subject line "RFI Response: [RFI Title] - [Your Company Name]".</li>
    <li><strong>Next Steps:</strong> Following a review of all responses, we may contact select vendors for follow-up discussions or product demonstrations.</li>
</ul>
`;

const NDA_TEMPLATE = `<h1>Mutual Non-Disclosure Agreement (NDA)</h1>
<p>This Non-Disclosure Agreement (the "Agreement") is entered into as of <strong>[Date]</strong> ("Effective Date") by and between:</p>
<p><strong>Party A:</strong> <strong>[Your Company Name]</strong>, a [Your Company Type, e.g., Corporation] with its principal place of business at [Your Company Address] ("Party A").</p>
<p><strong>Party B:</strong> <strong>[Recipient Name/Company]</strong>, a [Recipient Company Type] with its principal place of business at [Recipient Address] ("Party B").</p>
<p>Hereinafter referred to individually as a "Party" and collectively as the "Parties".</p>
<hr>
<h2>RECITALS</h2>
<p>The Parties intend to engage in discussions concerning a potential business relationship related to [Describe the purpose of the discussion, e.g., the provision of marketing services] (the "<strong>Purpose</strong>"). In connection with the Purpose, each Party may disclose certain confidential information to the other.</p>
<h2>AGREEMENT</h2>
<p>NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:</p>
<h3>1. Definition of Confidential Information</h3>
<p>"<strong>Confidential Information</strong>" means any and all non-public information, whether disclosed in writing, orally, visually, or in any other form, including but not limited to:</p>
<ul>
    <li>Trade secrets, business plans, strategies, financial information.</li>
    <li>Customer lists, marketing plans, and operational procedures.</li>
    <li>Product designs, specifications, source code, and any other technical or business information.</li>
</ul>
<p>Information shall be considered Confidential Information if it is marked as "Confidential" or if it would be reasonably understood to be confidential given the nature of the information and the circumstances of its disclosure.</p>
<h3>2. Obligations of Receiving Party</h3>
<p>The Party receiving Confidential Information (the "<strong>Receiving Party</strong>") shall:</p>
<ol type="a">
    <li>Hold and maintain the Confidential Information in strict confidence.</li>
    <li>Use the Confidential Information solely for the <strong>Purpose</strong> and for no other reason.</li>
    <li>Not disclose such Confidential Information to any third party without the prior written consent of the disclosing Party (the "<strong>Disclosing Party</strong>").</li>
    <li>Limit dissemination of Confidential Information within its own organization to only those employees and contractors who have a "need to know" for the Purpose and who are bound by confidentiality obligations no less restrictive than those contained herein.</li>
</ol>
<h3>3. Exclusions from Confidential Information</h3>
<p>The obligations under this Agreement do not extend to information that:</p>
<ul>
    <li>(a) is or becomes publicly known through no fault of the Receiving Party;</li>
    <li>(b) was in the Receiving Party's possession prior to disclosure by the Disclosing Party, free of any confidentiality obligation;</li>
    <li>(c) is rightfully received by the Receiving Party from a third party without breach of any confidentiality obligation; or</li>
    <li>(d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information.</li>
</ul>
<h3>4. Compelled Disclosure</h3>
<p>If the Receiving Party is required by law, regulation, or court order to disclose any Confidential Information, it shall provide the Disclosing Party with prompt written notice of such requirement, so that the Disclosing Party may seek a protective order or other appropriate remedy.</p>
<h3>5. Return of Information</h3>
<p>Upon the written request of the Disclosing Party, the Receiving Party shall promptly return or, at the Disclosing Party's option, destroy all documents and other tangible materials containing any Confidential Information, including all copies thereof.</p>
<h3>6. No License or Warranty</h3>
<p>No license, right, or interest in any trademark, patent, or other intellectual property is granted under this Agreement. All Confidential Information is provided "AS IS" without any warranty, express or implied.</p>
<h3>7. Term and Termination</h3>
<p>This Agreement shall be effective as of the Effective Date and shall continue for a period of <strong>[e.g., three (3)] years</strong>, unless terminated earlier by either Party with thirty (30) days' written notice. The obligations of confidentiality herein shall survive the termination of this Agreement for a period of <strong>[e.g., five (5)] years</strong> from the date of disclosure.</p>
<h3>8. Governing Law</h3>
<p>This Agreement shall be governed by and construed in accordance with the laws of the <strong>State of [Your State]</strong>, without regard to its conflict of laws principles.</p>
<h3>9. General Provisions</h3>
<p>This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof. Any amendment must be in writing and signed by both Parties.</p>
<hr>
<p><strong>IN WITNESS WHEREOF,</strong> the Parties have executed this Agreement as of the Effective Date.</p>
<table style="width:100%;">
    <tbody>
        <tr>
            <td style="width:50%;"><strong>PARTY A: [Your Company Name]</strong></td>
            <td style="width:50%;"><strong>PARTY B: [Recipient Company Name]</strong></td>
        </tr>
        <tr>
            <td>
                <p>&nbsp;</p>
                <p>_________________________</p>
                <p>(Signature)</p>
                <p><strong>Name:</strong> [Your Name]</p>
                <p><strong>Title:</strong> [Your Title]</p>
            </td>
            <td>
                <p>&nbsp;</p>
                <p>_________________________</p>
                <p>(Signature)</p>
                <p><strong>Name:</strong> [Recipient Name]</p>
                <p><strong>Title:</strong> [Recipient Title]</p>
            </td>
        </tr>
    </tbody>
</table>
`;

export const TEMPLATES: Template[] = [
    {
        key: 'RFP',
        name: 'Request for Proposal',
        description: 'A comprehensive template to solicit detailed proposals for a specific project, outlining scope, requirements, and evaluation criteria.',
        content: RFP_TEMPLATE,
    },
    {
        key: 'RFQ',
        name: 'Request for Quotation',
        description: 'A streamlined template to gather competitive pricing for specific goods or services with detailed specifications.',
        content: RFQ_TEMPLATE,
    },
    {
        key: 'RFI',
        name: 'Request for Information',
        description: 'A formal template to explore vendor capabilities and gather general information about solutions in the market.',
        content: RFI_TEMPLATE,
    },
    {
        key: 'NDA',
        name: 'Non-Disclosure Agreement',
        description: 'A robust, legally-binding agreement to protect sensitive information shared between two parties.',
        content: NDA_TEMPLATE,
    },
];