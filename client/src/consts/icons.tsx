import {
  LogoAngular,
  LogoReact,
  LogoSvelte,
  LogoNpm,
  LogoKubernetes,
  WorkflowAutomation,
  Http,
} from "@carbon/icons-react";

export const icons = [
  "Angular",
  "React",
  "Svelte",
  "Kuber",
  "Node",
  "QA",
  "BackEnd",
];

export const GetIcon = (icon: string) => {
  switch (icon) {
    case "Angular":
      return <LogoAngular size={32} />;
    case "React":
      return <LogoReact size={32} />;
    case "Svelte":
      return <LogoSvelte size={32} />;
    case "Kuber":
      return <LogoKubernetes size={32} />;
    case "Node":
      return <LogoNpm size={32} />;
    case "QA":
      return <WorkflowAutomation size={32} />;
    case "BackEnd":
      return <Http size={32} />;
    default:
      return <LogoReact size={32} />;
  }
};
