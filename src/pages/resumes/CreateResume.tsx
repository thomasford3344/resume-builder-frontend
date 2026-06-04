import * as React from "react";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  generateResumeStream,
  type GenerateResumeDto,
} from "../../services/resumeService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const schema = yup
  .object({
    companyName: yup.string().required("Company name is required"),
    roleType: yup.string().required("Role type is required"),
    jobDescription: yup.string().required("Job description is required")
  })
  .required();

const industryOptions = [
  {
    value: 'default',
    label: 'Default',
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
  },
  {
    value: 'fintech',
    label: 'Fintech',
  },
  {
    value: 'cybersecurity',
    label: 'Cybersecurity',
  },
  {
    value: 'ai',
    label: 'AI/Big Data',
  },
  {
    value: 'food',
    label: 'Food & Beverage',
  },
  {
    value: 'ecommerce',
    label: 'eCommerce',
  },
  {
    value: 'insurance',
    label: 'Insurance',
  },
  {
    value: 'realestate',
    label: 'Real Estate',
  },
  {
    value: 'marketing',
    label: 'Marketing',
  },
  {
    value: 'telecom',
    label: 'Telecommunication',
  },
  {
    value: 'gaming',
    label: 'Gaming',
  },
];

type FormData = yup.InferType<typeof schema>;

const CreateResume: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    industry: "default"
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: "",
      roleType: "",
      jobDescription: ""
    },
  });

  const handleIndustryChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      "industry": option === "" ? "default" : option
    }));
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const payload: GenerateResumeDto = {
        companyName: data.companyName,
        roleType: data.roleType,
        jobDescription: data.jobDescription,
        industry: formData.industry
      };

      // Use the streaming service function
      const response = await generateResumeStream(payload);

      // If resume generation started, redirect to resumes page
      if (response.resumeId) {
        toast.success("Resume generation started! Redirecting to resumes page...");
        navigate("/resumes");
        return;
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate resume";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Generate Resume
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...register("companyName")}
            label="Company Name"
            fullWidth
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
            required
            size="small"
            disabled={isSubmitting}
          />
          <TextField
            {...register("roleType")}
            label="Role Type"
            fullWidth
            error={!!errors.roleType}
            helperText={errors.roleType?.message}
            required
            size="small"
            disabled={isSubmitting}
          />
          <TextField
            {...register("jobDescription")}
            label="Job Description"
            fullWidth
            multiline
            rows={10}
            error={!!errors.jobDescription}
            helperText={errors.jobDescription?.message}
            required
            placeholder="Paste the job description here..."
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Generating Resume..." : "Generate Resume"}
          </Button>

        </Stack>
      </form>
    </Paper>
  );
};

export default CreateResume;

