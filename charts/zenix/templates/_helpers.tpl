{{/*
Labels communs Zenix
*/}}
{{- define "zenix.labels" -}}
app.kubernetes.io/part-of: Zenix
{{- end -}}

{{- define "zenix.namespace" -}}
{{- .Values.namespace | default "zenix" -}}
{{- end -}}
