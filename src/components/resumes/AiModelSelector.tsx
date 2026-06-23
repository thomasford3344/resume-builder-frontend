import * as React from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  type AiProvider,
  OPENAI_MODELS,
  CLAUDE_MODELS,
  DEFAULT_OPENAI_VERSION,
  DEFAULT_CLAUDE_VERSION,
} from "../../constants/aiModels";

interface AiModelSelectorProps {
  aiModel: AiProvider;
  aiVersion: string;
  onChange: (aiModel: AiProvider, aiVersion: string) => void;
  disabled?: boolean;
}

const AiModelSelector: React.FC<AiModelSelectorProps> = ({
  aiModel,
  aiVersion,
  onChange,
  disabled = false,
}) => {
  const models = aiModel === "openai" ? OPENAI_MODELS : CLAUDE_MODELS;

  const handleProviderChange = (
    _event: React.SyntheticEvent,
    newProvider: AiProvider,
  ) => {
    const defaultVersion =
      newProvider === "openai"
        ? DEFAULT_OPENAI_VERSION
        : DEFAULT_CLAUDE_VERSION;
    onChange(newProvider, defaultVersion);
  };

  return (
    <Box>
      {/* <Typography variant="subtitle2" sx={{ mb: 1 }}>
        AI Model
      </Typography> */}
      <Tabs
        value={aiModel}
        onChange={handleProviderChange}
        slotProps={{ indicator: { style: { display: "none" } } }}
        sx={{
          mb: 2,
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 42,
          "& .MuiTab-root": {
            textTransform: "none",
            minHeight: 42,
            px: 2.5,
            mr: 0.5,
            borderRadius: "6px 6px 0 0",
            transition: "background-color 0.2s ease, color 0.2s ease",
          },
          "& .MuiTab-root.Mui-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <Tab label="Open AI" value="openai" disabled={disabled} />
        <Tab label="Claude" value="claude" disabled={disabled} />
      </Tabs>
      <FormControl fullWidth size="small" disabled={disabled}>
        <InputLabel id="ai-version-label">Model Version</InputLabel>
        <Select
          labelId="ai-version-label"
          label="Model Version"
          value={aiVersion}
          onChange={(e) => onChange(aiModel, e.target.value)}
        >
          {models.map((model) => (
            <MenuItem key={model.value} value={model.value}>
              {model.label}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>
          Select the AI model used to tailor this resume
        </FormHelperText> */}
      </FormControl>
    </Box>
  );
};

export default AiModelSelector;
